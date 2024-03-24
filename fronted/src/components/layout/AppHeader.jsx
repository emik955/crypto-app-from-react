import { Button, Layout, Select, Space, Modal, Drawer   } from 'antd';
import { useCripto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CryptoInfoModal';
import AddAssetsForm from '../AddAssetsForm';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const AppHeader = () => {
  const [select, setSelect] = useState(false)
  const [coin, setCoin] = useState(null)
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)

  const {crypto} = useCripto()

  useEffect(() => {
    const keypress = (e) => {
      if (e.key === '/') {
        setSelect(prev => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  const handleSelect = (value) => {
    setCoin(crypto.find((c) => c.id === value))
    setModal(true)
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect(prev => !prev)}
        value="press / to open"
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{width: 20}} src={option.data.icon} alt={option.data.label} /> {option.data.label}
          </Space>
        )}
      />

      <Button onClick={() => setDrawer(true)} type='primary'>Add Asset</Button>

      <Modal 
        open={modal} 
        onOk={() => setModal(false)} 
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer 
        destroyOnClose 
        width={500} 
        title="Add Asset" 
        onClose={() => setDrawer(false)} 
        open={drawer}
      >
        <AddAssetsForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
export default AppHeader;