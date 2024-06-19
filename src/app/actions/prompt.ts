import OpenAI from 'openai'

const openai = new OpenAI()

async function generateText() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are here to help people create a plan on how to find a job. Answer in plain text and keep the answers short. Only answer questions regarding job hunting.',
      },
      {
        role: 'user',
        content:
          'I am looking to work as a software engineer. What should I do to find a job?',
      },
    ],
    model: 'gpt-3.5-turbo',
  })
  return completion.choices[0].message.content
}

export default generateText
