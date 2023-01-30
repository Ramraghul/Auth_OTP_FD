import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { API } from '../API';

function JSON() {
    const Location = useLocation()
    const allData = Location.state.id
    const [data, setData] = useState([])

    useEffect(() => {
        datas(allData)
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    

    let datas = async (id) => {
        try {
            let final = await axios.get(`${API.Call}/Data/${id}`,)
            setData(final.data)
        } catch (error) {
            console.log(error);
        }
    }
    


    return (
        <><table className="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
            {
                !data ? <h5 className="text-black">Loading...</h5>:data.map((value,index)=>{
                    return(
                        <tr key={index}>
                        <th>{value.Name}</th>
                        <td>{value.Age}</td>
                        <td>{value.Gender}</td>
                        <td>{value.Email}</td>
                    </tr>
                    )
                })
            }
            </tbody>
        </table>

        </>
    )
}

export default JSON