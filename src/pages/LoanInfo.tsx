import { Page, Text, Input, Button, Box, Checkbox, Slider, Select } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LoanInfo() {
  const navigate = useNavigate();

  // ==========================
  // STATE
  // ==========================
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [cccd, setCccd] = useState("");
  const [cccdError, setCccdError] = useState("");

  const [cmndOld, setCmndOld] = useState("");
  const [cmndOldError, setCmndOldError] = useState("");

  const [insurance, setInsurance] = useState(false);
  const [amount, setAmount] = useState(10_000_000);
  const [term, setTerm] = useState(6);

  // ==========================
  // AUTO-FILL từ Zalo nếu có
  // ==========================
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

  // ==========================
  // VALIDATION RULES
  // ==========================

  const validateName = (v: string) => {
    if (!v.trim()) return "Tên không được để trống";
    if (v.trim().length < 3) return "Tên quá ngắn";
    if (/[^a-zA-ZÀ-ỹ\s]/.test(v)) return "Tên không chứa số hoặc ký tự đặc biệt";
    return "";
  };

  const validatePhone = (v: string) => {
    if (!/^[0-9]*$/.test(v)) return "Số điện thoại chỉ được chứa số";
    if (v.length !== 10) return "Số điện thoại phải gồm 10 số";
    if (!/^0/.test(v)) return "Số điện thoại phải bắt đầu bằng số 0";
    return "";
  };

  const validateCCCD = (v: string) => {
    if (!/^[0-9]*$/.test(v)) return "CCCD chỉ được chứa số";
    if (v.length !== 12) return "CCCD phải gồm 12 số";
    return "";
  };

  const validateCMND = (v: string) => {
    if (!v.trim()) return "";
    if (!/^[0-9]*$/.test(v)) return "CMND chỉ được chứa số";
    if (v.length !== 9) return "CMND phải gồm 9 số";
    return "";
  };

  // ==========================
  // TÍNH TOÁN
  // ==========================
  const monthlyPayment = () => {
    const rate = 0.0325;
    const principal = amount;
    const months = term;
    const monthly = principal * rate + principal / months;
    return Math.round(monthly / 1000) * 1000;
  };

  const formatVND = (num: number) => num.toLocaleString("vi-VN");

  // ==========================
  // NEXT
  // ==========================
  const next = () => {
    const cleanAmount = Number(amount);
    const monthly = monthlyPayment();

    const data = {
      name,
      phone,
      cccd,
      cmndOld: cmndOld || "Không có",
      amount: cleanAmount,
      term,
      rate: 3.25,
      monthlyPayment: monthly,
      insurance,
      display: {
        amount: `${formatVND(cleanAmount)} VNĐ`,
        term: `${term} tháng`,
        rate: "3.25%/tháng",
        monthly: `${formatVND(monthly)} VNĐ`,
      },
    };

    sessionStorage.setItem("loanData", JSON.stringify(data));
    navigate("/confirm");
  };

  // ==========================
  // UI
  // ==========================
  return (
    <Page className="bg-white">
      <div className="bg-green-600 text-white text-center py-4">
        <Text className="text-xl font-bold">FE Credit</Text>
      </div>

      <Box className="px-6 pt-6">

        {/* ==== THANH KÉO SỐ TIỀN VAY ĐƯA LÊN TRƯỚC ==== */}
        <Text className="font-bold mb-2">Số tiền cần vay</Text>

        {/* Hiển thị số tiền màu xanh */}
        <Text className="text-green-600 font-semibold mb-1">
          {formatVND(amount)} 
        </Text>

        <div className="mb-6">
          <Slider
            min={5_000_000}
            max={50_000_000}
            step={1_000_000}
            value={amount}
            onChange={(v) => setAmount(Array.isArray(v) ? v[0] : v)}
            label=""   // Ẩn label mặc định để không bị trùng
          />
        </div>


        {/* ==== BOX MỖI THÁNG PHẢI TRẢ (NGUYÊN UI) ==== */}
        <div className="bg-green-600 text-white rounded-2xl p-6 mb-6 text-center">
          <Text className="text-lg">Lãi suất từ: 3.25%/tháng</Text>
          <Text className="text-lg underline">Tìm hiểu thêm</Text>
          <Text className="text-3xl font-bold mt-3">
            Mỗi tháng trả: {formatVND(monthlyPayment())} đ
          </Text>
        </div>

        {/* ==================== KỲ HẠN VAY ==================== */}
        <Text className="font-bold mb-2">Kỳ hạn vay</Text>

        <Select
          value={String(term)}                 // <- Quan trọng: Select nhận string
          onChange={(v) => setTerm(Number(v))} // <- lưu lại dạng số
          className="mb-8"
          placeholder="Chọn kỳ hạn"
        >
          {[3, 6, 9, 12, 18, 24, 36].map((m) => (
            <Select.Option key={m} value={String(m)}>
              {m} tháng
            </Select.Option>
          ))}
        </Select>



        {/* ======================== CÁC PHẦN BÊN DƯỚI GIỮ NGUYÊN ======================== */}

        <Text className="text-xl font-bold mb-4">Thông tin người vay</Text>

        <Input
          label="Họ tên đầy đủ"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(validateName(e.target.value));
          }}
          placeholder="Nguyễn Văn A"
          className="mb-1"
        />
        {nameError && <Text className="text-red-500 text-sm mb-3">{nameError}</Text>}

        <Input
          label="Số điện thoại"
          value={phone}
          onChange={(e) => {
            const v = e.target.value;
            if (/^[0-9]*$/.test(v)) setPhone(v);
            setPhoneError(validatePhone(v));
          }}
          placeholder="0901234567"
          className="mb-1"
        />
        {phoneError && <Text className="text-red-500 text-sm mb-3">{phoneError}</Text>}

        <Input
          label="Số CCCD"
          value={cccd}
          onChange={(e) => {
            const v = e.target.value;
            if (/^[0-9]*$/.test(v)) setCccd(v);
            setCccdError(validateCCCD(v));
          }}
          placeholder="025205009716"
          className="mb-1"
        />
        {cccdError && <Text className="text-red-500 text-sm mb-3">{cccdError}</Text>}

        <Input
          label="Số CMND cũ (nếu có)"
          value={cmndOld}
          onChange={(e) => {
            const v = e.target.value;
            if (/^[0-9]*$/.test(v)) setCmndOld(v);
            setCmndOldError(validateCMND(v));
          }}
          placeholder="025123456"
          className="mb-1"
        />
        {cmndOldError && <Text className="text-red-500 text-sm mb-3">{cmndOldError}</Text>}

        <div className="flex items-center mb-6">
          <Checkbox
            value="insurance"
            checked={insurance}
            onChange={(e: { target: { checked: boolean } }) =>
              setInsurance(e.target.checked)
            }
          />
          <Text className="ml-3">Bảo hiểm khoản vay</Text>
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
          disabled={
            !name ||
            !phone ||
            !cccd ||
            !!nameError ||
            !!phoneError ||
            !!cccdError ||
            !!cmndOldError
          }
        >
          Tiếp theo
        </Button>
      </Box>
    </Page>
  );
}
