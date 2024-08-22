import { AppstoreOutlined, PhoneOutlined, ShopOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const items = [
    {
        label: <Link to="/">Home</Link>,
        key: '1',
        icon: <AppstoreOutlined />,
    },
    {
        label: <Link to="/">Usados</Link>,
        key: '2',
        icon: <ShopOutlined />,
    },
    {
        label: 'Contacto',
        key: '3',
        icon: <PhoneOutlined />,
    },
    {
        label: <Link to="/admin">Admin</Link>,
        key: '4',
        icon: <SettingOutlined />
    },
];

export default items;
