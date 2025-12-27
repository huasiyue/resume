import React from 'react';
import './header.less';

import { useModeSwitcher } from '@/hooks/useModeSwitcher';

const Header: React.FC = () => {
    const [ModeSwitcher, mode, changeMode] = useModeSwitcher({});

    return (
        <header style={{ backgroundColor: 'transparent' }}>
            {ModeSwitcher}
            {mode === 'edit' && (
                <span className="action-link" onClick={() => changeMode('read')}>
                    查看
                </span>
            )}
        </header>
    );
};

export default Header;
