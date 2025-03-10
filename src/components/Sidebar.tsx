import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const pages = [
        { name: 'Stores', path: '/stores' },
        { name: 'SKUs', path: '/skus' },
        { name: 'Planning', path: '/planning' },
        { name: 'Chart', path: '/chart' }
    ];

    return (
        <div style={{ width: '250px', background: '#F0F2F5', height: '100vh', paddingTop: '20px' }}>
            <List>
                {pages.map((page, index) => (
                    <React.Fragment key={index}>
                        <ListItem component={Link} to={page.path}>
                            <ListItemText primary={page.name} />
                        </ListItem>
                        {index < pages.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
};

export default Sidebar;
