import React, { useState } from 'react'

import { Form, Button, Row, Col } from 'react-bootstrap'


const SearchBox = ({history}) => {
    const [keyWord, setKeyWord] = useState('')
    const submitHandler=(e)=>{
        e.preventDefault()
        if(keyWord.trim){
            history.push(`/search/${keyWord}`)
        }else{
            history.push('/')
        }
    }

    const myStyles = {
        display : "flex",
        flexDirection : "row",
        columnGap: "5px",
        margin : "3px"
    }
    return (
        <Form style={myStyles} onSubmit={ submitHandler } inline >
            <Form.Control style={{display: "inline"}} type='text' name='q' onChange={ e => setKeyWord(e.target.value) } placeholder='Search Product' className='mr-3 ml-3'>
            </Form.Control>
            <br/>
            <Button  className="ml-3" style={{display :"inline"}} type="submit" variant='primary'>Search</Button>
        </Form>
    )
}

export default SearchBox
