import React from 'react';
import treeImage from '../images/tree.png'; // 导入树的图片
import '../css/Tree.css';

const Tree = () => {
    return (
        <div >
            <img src={treeImage} alt="Tree" style={{ width: '300px', height: '300px' }} />
{/* 使用 img 标签显示图片 */}
        </div>
    );
};

export default Tree;
