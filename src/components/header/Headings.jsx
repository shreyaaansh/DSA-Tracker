import { Flex, Text } from '@chakra-ui/react'
import { DarkModeToggle } from '../icons/ProjectIcons.jsx'
import { useAuth } from '../../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
const Headings = ({ data, setData }) => {
    const heading = 'DSA Tracker'
    const { user } = useAuth();
    const navigate = useNavigate();

    const { logout } = useAuth();
    const handleLogOut = () => {
        logout();
        navigate('/login');
    }
    const isDarkMode = data.data.header.darkMode
    return (
        <>
         <button onClick={handleLogOut} className="btn btn-outline-success" >Log Out</button>
        <Flex
            className={'headings'}
            w={'100vw'}
            px={6}
            mt={4}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            <DarkModeToggle data={data} setData={setData} toShow={false} />
            <Text
                flexGrow={1}
                align={'center'}
                fontWeight={'lg'}
                fontSize={'5xl'}
                fontFamily={'customFamily'}
                fontStyle={'normal'}
                color={isDarkMode ? 'defaultColor_dark' : 'defaultColor'}
            >
                {heading}
            </Text>
            <DarkModeToggle data={data} setData={setData} toShow={true} />
        </Flex>
        </>
    )
}

export default Headings
