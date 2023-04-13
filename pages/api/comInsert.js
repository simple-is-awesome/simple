import supabase from 'utils/supabase'
import nodemailer from 'nodemailer'
import config from 'config'

async function getEmailsFromParentComments(commentId) {
	const { data, error } = await supabase
	  .from('comment_emails')
	  .select('emails')
	  .eq('id', commentId)
	  .single()
  
	if (error) {
	  console.error('Error fetching parent comment emails:', error)
	  return []
	}
  
	return data.emails
}  
  
// Configure Nodemailer
const transporter = nodemailer.createTransport({
	host: process.env.Email_Host,
	port: process.env.Email_Port,
	secure: process.env.Email_Secure,
	auth: {
		user: process.env.Email_UserName,
		pass: process.env.Email_Password,
	},
})

export default async function handler(req, res) {
	const { username, email, website, content, token } = req.body
	const processedContent = content.replace(/(^<blockquote>[\s\S]*<\/blockquote>\s*)|(\s*<br\s*\/>\s*)/g, '')
	const parent_comment_id = req.body.parent_comment_id || null
	
	const refererUrl = new URL(req.headers.referer)

	const cleanUrl = `${refererUrl.origin}${refererUrl.pathname}`

	const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
	const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY

	const result = await fetch(verifyEndpoint, {
		method: 'POST',
		body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	})

	const data = await result.json()
	if (!data.success) {
		return res.status(403).json({ error: 'Invalid token' })
	  } else {
		const { data: insertedData, error } = await supabase
		  .from('comments')
		  .insert([
				{ username: username, email: email, website: website, content: content, url: cleanUrl, parent_comment_id: parent_comment_id },
		  ])
		  .select()
	  
		if (error) {
		  console.error('Error inserting comment:', error)
		  return res.status(500).json({ error: error.message })
		}
	  
		// 插入成功后，获取相关父评论的email
		const parentCommentEmails = await getEmailsFromParentComments(insertedData[0].id)
	  
		// 发送邮件通知给所有相关父评论的作者
		for (const parentCommentEmail of parentCommentEmails) {
		  try {
				await transporter.sendMail({
			  from: process.env.Email_UserName, // 发件人地址
			  to: parentCommentEmail, // 收件人地址
			  subject: `New reply to your comment in ${config.siteTitle}`, // 主题
			  text: `${username} replied to your comment: ${processedContent}. Please visit ${cleanUrl} to view it.`, // 纯文本内容
			  html: `<p>${username} replied to your comment: ${processedContent}. <br/> Please visit <a href="${cleanUrl}">${cleanUrl}</a> to view it.</p>`, // HTML内容
				})
		  } catch (err) {
				console.error('Error sending email:', err)
		  }
		}
	  
		res.status(200).json(insertedData)
	  }
}
