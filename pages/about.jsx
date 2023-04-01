import Layout from 'components/Layout'
import Head from 'next/head'
import NewTodo from 'components/NewTodo'
import supabase from 'utils/supabase'
import {
	useEffect, useState
} from 'react'

export default function About() {
	const [todos, setTodos] = useState([])

	const fetchTodos = async () => {
		const { data } = await supabase.from('todos').select('*')
		setTodos(data)
	}

	useEffect(() => {
		fetchTodos()
	  }, [])

	return (
		<Layout>
			<Head>
				<title>About</title>
			</Head>
			<h1 className='text-center my-3'>About</h1>
			<div className='flex justify-center items-center mx-auto'>
				Hello, my name is xxx. I am xxx, currently studying at xxx.<br/>
				
				My major is xxx. I aspire to become a xxx.
			</div>
			<NewTodo reload={fetchTodos} />
			{todos.map((todo) => (
				<p key={todo.id}>{todo.title}</p>
			))}
		</Layout>
	)
}