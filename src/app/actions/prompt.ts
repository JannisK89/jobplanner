import OpenAI from 'openai'

const openai = new OpenAI()

async function generateText() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        You are here to help people create a plan on how to find a job. Answer in plain text. 
          Answer all 3 questions with a # in between each answer so that the 3 questions easily can be extracted from the answer using a simple string split.
          Answer the following questions:
          1. What should I do to find a job?
          2. What is the job market currently like?
          3. How do I prepare for a job interview?
            Use the following information to answer the questions:
            - The jobseeker is a software engineer with 5 years of experience.
            - They have experience working as a DevOps engineer.
            - Software engineers are in high demand and the job market is competitive.
            - There are curently 250 open positions for software engineers in the job market.
            - DevOps engineers are also in high demand and the job market is competitive.
            - There are currently 100 open positions for DevOps engineers in the job market.
          `,
      },
    ],
    model: 'gpt-3.5-turbo',
  })
  return completion.choices[0].message.content
}

export default generateText
