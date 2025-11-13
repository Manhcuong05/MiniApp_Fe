import { Page, Text, Button, Box } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';

export default function Intro() {
  const navigate = useNavigate();

  return (
    <Page className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white min-h-screen flex flex-col justify-end px-6 pb-16">
      {/* Optional: Add a subtle overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.2)_0%,_transparent_60%)]" />
      </div>

      <Box className="relative z-10 flex flex-col items-center justify-end pb-20">
        {/* Logo / Brand */}
        <div className="mb-8 animate-fade-in">
          <Text className="text-5xl md:text-6xl font-black tracking-tight text-center drop-shadow-lg">
            FE CREDIT
          </Text>
          <div className="h-1 w-20 bg-white mx-auto mt-3 rounded-full shadow-md"></div>
        </div>

        {/* Tagline */}
        <Text className="text-xl md:text-2xl font-medium text-center mb-12 leading-relaxed opacity-95 animate-fade-in-delay">
          Vay vốn <span className="font-bold text-yellow-300">chỉ trong 3 phút</span>
          <br />
          qua Zalo
        </Text>

        {/* CTA Button */}
        <Button
          className="w-full max-w-xs bg-white text-green-600 font-bold text-lg rounded-full shadow-xl 
                     transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                     active:scale-95 animate-slide-up"
          size="large"
          onClick={() => navigate('/terms')}
        >
          Bắt đầu ngay
        </Button>

        {/* Trust Badge */}
        <Text className="mt-8 text-xs opacity-70 animate-fade-in-delay-2">
          Được tin dùng bởi hơn 1 khách hàng (it's a me)
        </Text>
      </Box>
    </Page>
  );
}

/* ——————————————————————
   Inline CSS Animations (no dependencies)
   —————————————————————— */
const styles = `
<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { transform: translateY(40px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }
  .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
  .animate-fade-in-delay { animation: fadeIn 0.8s 0.3s ease-out forwards; opacity: 0; }
  .animate-fade-in-delay-2 { animation: fadeIn 0.8s 0.6s ease-out forwards; opacity: 0; }
  .animate-slide-up { animation: slideUp 0.7s 0.5s ease-out forwards; opacity: 0; }
</style>
`;

// Inject styles on mount (safe for Zalo Mini App)
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerHTML = styles;
  document.head.appendChild(styleSheet);
}