import PropTypes from 'prop-types';
import WalletList from '../../components/WalletList';

const Dashboard = ({ userId }) => {
return (
    <div>
    <h1>Usuario Dashboard</h1>
    <WalletList userId={userId} />
    </div>
);
};

// Definir las PropTypes
Dashboard.propTypes = {
userId: PropTypes.string.isRequired,
};

export default Dashboard;
