import { Page, Text, Input, Button, Box, Checkbox, Slider } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LoanInfo() {
  const navigate = useNavigate();

  // Default values for quick testing
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cccd, setCccd] = useState("");
  const [cmndOld, setCmndOld] = useState("");
  const [insurance, setInsurance] = useState(false);
  const [amount, setAmount] = useState(10_000_000);
  const [term, setTerm] = useState(6);

  // Try to read from Zalo SDK (fallback to manual entry)
  useEffect(() => {
    if ((window as any).zmp) {
      (window as any).zmp.getUserInfo({
        success: (res: any) => {
          const { userInfo } = res;
          if (userInfo.name) setName(userInfo.name);
          if (userInfo.phone) setPhone(userInfo.phone);
        },
      });
    }
  }, []);

  const monthlyPayment = () => {
    const rate = 0.0325; // 3.25%/month
    const principal = amount;
    const months = term;
    const monthly = principal * rate + principal / months;
    return Math.round(monthly / 1000) * 1000;
  };

  const formatVND = (num: number) => num.toLocaleString("vi-VN");

  const next = () => {
  const cleanAmount = Number(amount); // số nguyên
  const monthly = monthlyPayment();

  const data = {
    name,
    phone,
    cccd,
    cmndOld: cmndOld || "Không có",
    amount: cleanAmount, // <-- gửi kiểu số
    term,
    rate: 3.25,
    monthlyPayment: monthly,
    insurance,
    display: {
      amount: `${formatVND(cleanAmount)} VNĐ`,
      term: `${term} tháng`,
      rate: "3.25%/tháng",
      monthly: `${formatVND(monthly)} VNĐ`
    }
  };

  sessionStorage.setItem("loanData", JSON.stringify(data));
  navigate("/confirm");
};


  return (
    <Page className="bg-white">
      <div className="bg-green-600 text-white text-center py-4">
        <Text className="text-xl font-bold">FE Credit</Text>
      </div>

      <Box className="px-6 pt-6">
        {/* Interest banner */}
        <div className="bg-green-600 text-white rounded-2xl p-6 mb-6 text-center">
          <Text className="text-lg">Lãi suất từ: 3.25%/tháng</Text>
          <Text className="text-lg underline">Tìm hiểu thêm</Text>
          <Text className="text-3xl font-bold mt-3">
            Mỗi tháng trả: {formatVND(monthlyPayment())} đ
          </Text>
        </div>

        <div className="flex items-center mb-6">
          <Checkbox
            value="insurance"
            checked={insurance}
            onChange={(e: { target: { checked: boolean } }) => setInsurance(e.target.checked)}
          />
          <Text className="ml-3">Bảo hiểm khoản vay</Text>
        </div>

        <Text className="text-xl font-bold mb-4">Thông tin người vay</Text>
        <Text className="text-sm text-gray-500 mb-6">
          Điền đầy đủ để test
        </Text>

        <Input
          label="Họ tên đầy đủ"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nguyễn Văn A"
          className="mb-4"
        />
        <Input
          label="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0901234567"
          className="mb-4"
        />
        <Input
          label="Số CCCD"
          value={cccd}
          onChange={(e) => setCccd(e.target.value)}
          placeholder="025205009716"
          className="mb-4"
        />
        <Input
          label="Số CMND cũ (nếu có)"
          value={cmndOld}
          onChange={(e) => setCmndOld(e.target.value)}
          placeholder="Ví dụ: 025123456"
          className="mb-6"
        />

        {/* Amount slider */}
        <Text className="font-bold mb-2">Số tiền cần vay</Text>
        <div className="mb-6">
          <Slider
            min={5_000_000}
            max={50_000_000}
            step={1_000_000}
            value={amount}
            onChange={(v) => setAmount(Array.isArray(v) ? v[0] : v)}
            label={`${formatVND(amount)} VND`}
          />
        </div>

        {/* Term slider */}
        <Text className="font-bold mb-2">Kỳ hạn vay</Text>
        <div className="mb-8">
          <Slider
            min={3}
            max={36}
            step={3}
            value={term}
            onChange={(v) => setTerm(Array.isArray(v) ? v[0] : v)}
            label={`${term} tháng`}
          />
        </div>

        <div className="bg-blue-50 rounded-xl p-4 flex mb-8 items-start">
          <Text className="text-2xl mr-3">Info</Text>
          <Text className="text-sm flex-1">
            Đây là bản test – bạn có thể nhập gì cũng được
          </Text>
        </div>

        <Button
          className="w-full bg-green-600 text-white font-bold text-lg rounded-full"
          size="large"
          onClick={next}
          disabled={!name || !phone || !cccd || cccd.length !== 12}
        >
          Tiếp theo
        </Button>
      </Box>
    </Page>
  );
}