import React,{useState,useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { CommonContext } from '../App';

function Status() {
  let commonContext = useContext(CommonContext)
  let [data,setData] = useState(undefined)
  let [ticket,setTicket] = useState("")

  let handleLoadTicket = async()=>{
    let res = await axios.get(`${commonContext.apiurl}/issues/${ticket}`)
    if(res.data.statusCode===200)
    {
      setData(res.data.issue[0])
    }
  }
  return <>
  <div className='col-5 mx-auto'>
    <Form>
    <Form.Group className="mb-3">
        <Form.Label>Ticket Number<sup>*</sup></Form.Label>
        <Form.Control type="text" placeholder="Enter Ticket Nuber"  onChange={(e)=>setTicket(e.target.value)}/>
      </Form.Group>
      <div className='mt-3' style={{"textAlign":"center"}}>
            <Button variant="primary" onClick={()=>handleLoadTicket()} >
                Submit
            </Button>
        </div>
    </Form>
    {
      data!==undefined?<>
              <div style={{"textAlign":"left","paddingTop":"20px"}}>
                <h2 style={{"textAlign":"center"}}>Welcome to Zen Desk!</h2>
                <h5><strong>Issue Title :</strong> {data.issueTitle}</h5>
                <div><strong>Issue Type :</strong> {data.issueType}</div>
                <div><strong>Issue Description :</strong> {data.issueDescription}</div>
                <div><strong>Status :</strong> 
                <span style={data.status==="Open"?{"color":"red"}:data.status==="In-Progress"?{"color":"#d4d435"}:{"color":"green"}}>{data.status}</span>
                <div><strong>Created Date : </strong>{data.createdAt}</div>
                { data.status==="In-Progress" || data.status==="Clossed" ? <div><strong>Opend Date : </strong>{data.inProgressDate}</div>:<></>}
                {
                  data.status==="Clossed"?
                  <div><strong>Closed Date : </strong>{data.closedDate}</div>:<></>
                }
                <div><strong>Comment :</strong> {data.comments}</div>
                
                </div>
              </div>
            </>:<></>
    }
    </div>
  </>
}

export default Status