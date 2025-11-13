import { Page, Text, Button, Box } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  return (
    <Page className="bg-gradient-to-b from-green-50 to-white min-h-screen flex flex-col items-center justify-center px-6">
      <Box className="text-center max-w-md w-full">

        {/* ---- Animated Checkmark (pure SVG + CSS) ---- */}
        <div className="mx-auto mb-8 w-28 h-28 bg-green-100 rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
          <svg
            className="w-16 h-16 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
              className="checkmark-path"
            />
          </svg>
        </div>

        {/* ---- Title ---- */}
        <Text className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          Gửi hồ sơ thành công!
        </Text>

        {/* ---- Subtitle ---- */}
        <Text className="text-lg text-gray-600 mb-10 leading-relaxed">
          Chúng tôi sẽ liên hệ Quý khách trong vòng{' '}
          <span className="font-semibold text-green-600">24 giờ</span> tới.
        </Text>

        {/* ---- Button ---- */}
        <Button
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg rounded-full shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          size="large"
          onClick={() => navigate('/')}
        >
          Về trang chủ
        </Button>

        {/* ---- Footer note ---- */}
        <Text className="mt-8 text-xs text-gray-400">
          Cảm ơn Quý khách đã tin tưởng dịch vụ của chúng tôi.
        </Text>
      </Box>
    </Page>
  );
}

/* -------------------------------------------------
   Tiny CSS animation (you can put this in a .css file
   or inside a <style> tag in index.html)
   ------------------------------------------------- */
const bounceInKeyframes = `
@keyframes bounceIn {
  0%   { transform: scale(0);   opacity: 0; }
  60%  { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1);   opacity: 1; }
}
.animate-bounce-in {
  animation: bounceIn 0.7s ease-out forwards;
}
.checkmark-path {
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  animation: drawCheck 0.6s 0.3s ease-out forwards;
}
@keyframes drawCheck {
  to { stroke-dashoffset: 0; }
}
`;

/* If you use a global CSS file (e.g. src/index.css) */
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = bounceInKeyframes;
  document.head.appendChild(style);
}