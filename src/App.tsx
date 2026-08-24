import { Card } from 'antd';
import CheckBox from './components/CheckBox';
import Paragraph from './components/paragraph';
import Signature from './components/signature';


function App() {
 
  return (
    <>
   
    <Card> <h1 className='text-3xl'>Document</h1>
      <CheckBox/>
      <Paragraph/>
      <Signature/>
    </Card>
    
    </>
  )
}

export default App
