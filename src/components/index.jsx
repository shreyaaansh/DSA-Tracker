import { Flex } from '@chakra-ui/react'
import { useState ,useEffect} from 'react'

import Content from './content/Content.jsx'
import Footer from './footer/Footer.jsx'
import Header from './header/Header.jsx'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const DSA = ({ data, setData, isHomeScreen, selectedContentIndex }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]); 
    let [searchValue, setSearchValue] = useState('')
    const isDarkMode = data.data.header.darkMode
    return (
        <Flex
            className={'app'}
            w={'100vw'}
            h={'100vh'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'space-between'}
            bg={isDarkMode ? 'fullPageColor_dark' : 'fullPageColor'}
        >
            <Header
                data={data}
                setData={setData}
                isHomeScreen={isHomeScreen}
                selectedContentIndex={selectedContentIndex}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            <Content
                data={data}
                setData={setData}
                isHomeScreen={isHomeScreen}
                selectedContentIndex={selectedContentIndex}
                searchValue={searchValue}
            />
            <Footer data={data} />
        </Flex>
    )
}

export default DSA
