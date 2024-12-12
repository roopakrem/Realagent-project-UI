import { Box, Divider, Flex, Paper, ScrollArea, StyleProp, Text } from '@mantine/core';
import classes from './Navigation.module.css';
import { useNavigate } from 'react-router-dom';
import { IconType } from '../common/Icons';
import { Icon } from '../common/Icons/Icon';

interface NavigationProps {
  w?: StyleProp<React.CSSProperties['width'] | undefined>;
  isTextVisible?: boolean;
}

const Navbar: React.FC<NavigationProps> = ({ w = '250px', isTextVisible = true }) => {
  const navigate = useNavigate();

  const handleOnClickBotstore = () => navigate('/dashboard/home');
  const handleOnClickPayment = () => navigate('/payment/home');

  return (
    <nav className={classes.navbar} style={{ width: w as string | number }}>
      {/* <Flex direction={'column'} gap={'10px'}> */}
        {/* <Paper w={'100%'}>
          <Divider c={'#DCE5EA'} size={'2px'} w={'100%'} />
        </Paper> */}
      {/* </Flex> */}
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          <Box pl={0} mb="md">
            {/** Botstore and Payment */}
            <Flex justify="center" align="center" gap="15px" onClick={handleOnClickBotstore}>
              <Icon icon={IconType.Botstore} style={{ marginTop: '6px', cursor: 'pointer' }} />
              <Text c="#595959" style={{ cursor: 'pointer' }}>
                {isTextVisible ? 'Botstore' : ''}
              </Text>
            </Flex>
            <Flex justify="center" align="center" gap="15px" onClick={handleOnClickPayment}>
              <Icon icon={IconType.Payment} style={{ marginTop: '6px', cursor: 'pointer' }} />
              <Text c="#007acc" style={{ cursor: 'pointer' }}>
                {isTextVisible ? 'Payment' : ''}
              </Text>
            </Flex>
          </Box>
        </div>
      </ScrollArea>
    </nav>
  );
};

export default Navbar;