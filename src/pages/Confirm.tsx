import { Page, Text, Button, Box } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import React from "react";

// ✅ Cấu hình endpoint backend
const API_BASE = "https://ee3c706d8c00.ngrok-free.app";
const ENDPOINT = `${API_BASE}/api/webhook/fecredit`;

// ✅ Hàm chuẩn hóa dữ liệu: loại bỏ ký tự tiền tệ "VNĐ", "." v.v.
const normalizeLoanData = (data: { amount: any; monthlyPayment: any; term: any; month: any; }) => {
  const stripNum = (v: string) =>
    typeof v === "string" ? Number(v.replace(/[^\d]/g, "")) : v;

  return {
    ...data,
    amount: stripNum(data.amount),
    monthlyPayment: stripNum(data.monthlyPayment),
    month: Number(data.term || data.month || 0),
    term: undefined, // bỏ field trùng
  };
};

export default function Confirm() {
  const navigate = useNavigate();
  const data = JSON.parse(sessionStorage.getItem("loanData") || "{}");

  const submit = async () => {
    try {
      if (!data || Object.keys(data).length === 0) {
        alert("Không có dữ liệu để gửi. Vui lòng quay lại điền thông tin.");
        return;
      }

      const payload = normalizeLoanData(data);
      console.log("📦 Dữ liệu chuẩn bị gửi:", payload);

      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("❌ Backend trả lỗi:", errText);
        alert(`Không gửi được dữ liệu (Mã lỗi ${response.status}).`);
        return;
      }

      const result = await response.json();
      console.log("✅ Gửi thành công, phản hồi từ backend:", result);

      sessionStorage.removeItem("loanData");
      navigate("/success");
    } catch (error) {
      console.error("🚨 Lỗi khi gửi dữ liệu:", error);
      alert("Không thể kết nối tới máy chủ. Hãy kiểm tra ngrok hoặc backend.");
    }
  };

  return (
    <Page className="bg-white">
      {/* Header */}
      <div className="bg-green-600 text-white text-center py-4">
        <Text className="text-xl font-bold">FE Credit</Text>
      </div>

      {/* Navigation Steps */}
      <div className="flex justify-around border-b px-6">
        <Text className="py-3 text-gray-500">Thông tin</Text>
        <Text className="py-3 font-bold border-b-4 border-green-600">
          Xác nhận
        </Text>
        <Text className="py-3 text-gray-500">Hoàn tất</Text>
      </div>

      {/* Nội dung */}
      <Box className="px-6 pt-6">
        <div className="flex justify-between items-center mb-6">
          <Text className="text-xl font-bold">Thông tin người vay</Text>
          <Text
            className="text-blue-600 underline text-sm cursor-pointer"
            onClick={() => navigate("/loan")}
          >
            Chỉnh sửa
          </Text>
        </div>

        {/* Thông tin cá nhân */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <Text>Họ và tên</Text>
            <Text className="font-bold">{data.name || "-"}</Text>
          </div>
          <div className="flex justify-between">
            <Text>Số điện thoại</Text>
            <Text className="font-bold">{data.phone || "-"}</Text>
          </div>
          <div className="flex justify-between">
            <Text>Số CCCD</Text>
            <Text className="font-bold">{data.cccd || "-"}</Text>
          </div>
        </div>

        {/* Thông tin khoản vay */}
        <Text className="text-xl font-bold mb-4">Thông tin gói vay</Text>
        <div className="bg-gray-100 rounded-xl p-5 space-y-4">
          <div className="flex justify-between">
            <Text>Số tiền cần vay</Text>
            <Text className="font-bold">
              {data.amount ? `${data.amount.toLocaleString()} VNĐ` : "-"}
            </Text>
          </div>
          <div className="flex justify-between">
            <Text>Kỳ hạn vay</Text>
            <Text className="font-bold">
              {data.term || data.month
                ? `${data.term || data.month} tháng`
                : "-"}
            </Text>
          </div>
          <div className="flex justify-between">
            <Text>Lãi suất</Text>
            <Text className="font-bold">{data.rate ? `${data.rate}%` : "-"}</Text>
          </div>
          <div className="flex justify-between">
            <Text>Ước tính trả mỗi tháng</Text>
            <Text className="font-bold">
              {data.monthlyPayment
                ? `${data.monthlyPayment.toLocaleString()} VNĐ`
                : "-"}
            </Text>
          </div>
        </div>

        {/* Cam kết */}
        <div className="mt-8 space-y-3 text-sm">
          <Text>• Tôi xác nhận các thông tin trên là chính xác.</Text>
          <Text>
            • Tôi đồng ý với các điều khoản Thỏa thuận sử dụng và Chính sách
            bảo mật.
          </Text>
        </div>

        {/* Nút gửi */}
        <Button
          className="w-full bg-green-600 text-white font-bold text-lg rounded-full mt-10"
          size="large"
          onClick={submit}
        >
          Đồng ý
        </Button>
      </Box>
    </Page>
  );
}
