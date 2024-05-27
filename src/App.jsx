import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import DSA from './components/index.jsx'
import { Flex } from '@chakra-ui/react'
import { Reacteroids } from './components/NotFound/Reacteroids.jsx'
import Login from './components/Login.jsx';
import Register from './components/Register.jsx'
function App({ fetchData }) {
    const [data, setData] = useState(fetchData)

    useEffect(() => {
        localStorage.setItem('A2Z_Archive', JSON.stringify(data))
    }, [data])

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <DSA
                        data={data}
                        setData={setData}
                        isHomeScreen={true}
                        selectedContentIndex={0}
                    />
                }
            />
            {data.data.content.map((contentData, index) => {
                return (
                    <Route
                        key={index}
                        path={contentData.contentPath}
                        element={
                            <DSA
                                data={data}
                                setData={setData}
                                isHomeScreen={false}
                                selectedContentIndex={index}
                            />
                        }
                    />
                )
            })}
            <Route
                path={'/play'}
                element={
                    <Flex w={'100vw'} h={'100vh'}>
                        <Reacteroids />
                    </Flex>
                }
            />

            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>

        </Routes>
    )
}

export default App
