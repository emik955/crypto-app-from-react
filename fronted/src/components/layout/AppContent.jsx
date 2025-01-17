import { Layout, Typography } from 'antd';
import { useCripto } from '../../context/crypto-context';
import PortFolioChart from './PortfolioChart';
import AssetsTable from './AssetsTable';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
};

const AppContent = () => {
  const { assets, crypto } = useCripto();

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price
    return acc
  }, {})

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title 
        level={3}
        style={{textAlign: 'left', color: '#fff'}}
      >
        Portfolio: {assets.map((asset) => asset.amount * cryptoPriceMap[asset.id])
        .reduce((acc, v) => acc + v, 0)
        .toFixed(2)} $
      </Typography.Title>
      <PortFolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}

export default AppContent;