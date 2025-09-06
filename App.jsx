import { useState, useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import Editor from "react-simple-code-editor"
import './App.css'
import Markdown from 'react-markdown'
import axios from 'axios'

function App() {
  
  const [code, setCode] = useState('function sum() {\n  return 1 + 1\n}')
  const [ review, setReview ] = useState(``)
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  async function reviewCode() {
  try {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    // Ensure it's always a string
    const reviewText = typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
    setReview(reviewText)
  } catch (error) {
    console.error('Error:', error)
    setReview('Error getting review')
  }
}


  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => Prism.highlight(code, Prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
               
              }}
            />
          </div>
          <div 
           onClick={reviewCode}
           className="review">Review</div>
        </div>
        <div className="right">
          {
            <Markdown>
              {review}
            </Markdown>
          }
        </div>
      </main>
    </>
  )
}

export default App