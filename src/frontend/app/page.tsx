'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import SendIcon from '@mui/icons-material/Send';

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/browser');
  };

  const ContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '855px',
    backgroundImage: 'url(background.png)', // 替换为你的图片路径
    backgroundSize: 'cover', // 确保图片覆盖整个容器
    backgroundPosition: 'center', // 确保图片居中显示
    backgroundRepeat: 'no-repeat', // 防止图片重复
  };

  const HomePageContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '85%',
    position: 'relative', // 使得子元素的绝对定位相对于此容器
  };

  const circleStyle: React.CSSProperties = {
    width: '500px', // 增大圆形的宽度以容纳文字
    height: '500px', // 增大圆形的高度以容纳文字
    borderRadius: '50%', // 将元素的形状设置为圆形
    position: 'absolute', // 使用绝对定位
    top: '50%', // 垂直居中
    left: '50%', // 水平居中
    transform: 'translate(-50%, -50%)', // 将元素的中心移动到定位点
    display: 'flex', // 使用 Flexbox 布局
    flexDirection: 'column', // 垂直布局
    justifyContent: 'center', // 主轴（垂直方向）居中对齐
    alignItems: 'center', // 交叉轴（水平方向）居中对齐
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // 使用 rgba 设置圆形的背景颜色和不透明度
  };

  const textStyle: React.CSSProperties = {
    color: 'white', // 设置文字颜色为白色
    textAlign: 'center', // 居中文字
    fontSize: '32px',
  };

  return (
    <div style={ContainerStyle}>
      <div style={HomePageContainerStyle}>
        <div style={circleStyle}>
          <p style={textStyle}>Our Slogan</p>
          <p style={textStyle}>Our Slogan</p>
          <p style={textStyle}>Our Slogan</p>
          <Button variant="contained" style={{ backgroundColor: 'orange' }} endIcon={<SendIcon />} onClick={handleClick}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}