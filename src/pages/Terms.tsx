import { Page, Text, Button, Box, Checkbox } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Terms() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  return (
    <Page className="bg-white">
      <div className="bg-green-600 text-white text-center py-4">
        <Text className="text-xl font-bold">FE Credit</Text>
      </div>

      <Box className="px-6 pt-6">
        <Text className="text-2xl font-bold text-center mb-6">
          Điều khoản đăng ký Vay
        </Text>

        <div className="bg-green-50 rounded-xl p-6 mb-6 text-center">
          <Text className="text-4xl font-bold text-green-600">FE CREDIT</Text>
        </div>

        <Text className="text-sm leading-6 mb-6">
          Bằng cách bấm "Đồng ý", Quý khách xác nhận hiểu rõ và đồng ý:
          <br />
          <br />
          Thông tin của Quý khách sẽ được Công ty Tài chính FE CREDIT (FE
          CREDIT) thu thập và xử lý nhằm mục đích xem xét và cung cấp dịch vụ
          tài chính của FE CREDIT cho Quý khách.
          <br />
          <br />
          Trong thời gian FE CREDIT thẩm định hồ sơ nhằm mục đích phát hành
          khoản vay theo đề nghị của Quý khách, dữ liệu cá nhân của Quý khách sẽ
          được kiểm soát, xử lý bởi FE CREDIT và các cá nhân, tổ chức khác theo
          quy định của pháp luật.
          <br />
          <br />
          Quý khách đồng ý với Điều kiện Điều khoản về bảo vệ dữ liệu cá nhân
          của FE CREDIT.
        </Text>

        <div className="flex items-center mb-6">
          <Checkbox
            value="oa"
            checked={checked}
            onChange={(e: { target: { checked: boolean } }) => setChecked(e.target.checked)}
          />
          <Text className="ml-3 text-sm">Đồng ý theo dõi Official Account</Text>
        </div>

        <div className="bg-gray-100 rounded-xl p-6 mb-8 text-center">
          <Text className="font-bold text-green-600 text-lg">
            FE CREDIT trên Zalo
          </Text>
          <Text className="text-sm">Official Account</Text>
        </div>

        <Button
          className="w-full bg-green-600 text-white font-bold text-lg rounded-full"
          size="large"
          disabled={!checked}
          onClick={() => navigate("/loan")}
        >
          Đồng ý
        </Button>
      </Box>
    </Page>
  );
}