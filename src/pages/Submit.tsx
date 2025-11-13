import { Page, Text, Button, Box } from 'zmp-ui';
import { useNavigate } from "react-router-dom";

export default function Submit() {
  const navigate = useNavigate();
  const data = JSON.parse(sessionStorage.getItem('FINAL') || '{}');

  const submit = async () => {
    try {
      await fetch('https://webhook.site/1a2b3c4d-5e6f-7g8h-9i0j-klmnopqrstuv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      alert('Gửi thành công! Chúng tôi sẽ liên hệ sớm.');
      sessionStorage.clear();
      navigate('/');
    } catch {
      alert('Lỗi mạng, vui lòng thử lại.');
    }
  };

  return (
    <Page className="p-6">
      <Text.Header>Xác nhận thông tin</Text.Header>
      <Box mt={4} className="space-y-3">
        <div className="flex justify-between">
          <Text bold>Họ tên:</Text>
          <Text>{data.name}</Text>
        </div>
        <div className="flex justify-between">
          <Text bold>SĐT:</Text>
          <Text>{data.phone}</Text>
        </div>
        <div className="flex justify-between">
          <Text bold>CMND:</Text>
          <Text>{data.cmnd}</Text>
        </div>
        <div className="flex justify-between">
          <Text bold>Thu nhập:</Text>
          <Text>{Number(data.income).toLocaleString()} VNĐ</Text>
        </div>
        <Button type="highlight" size="large" onClick={submit} className="w-full mt-6">
          Gửi thông tin
        </Button>
      </Box>
    </Page>
  );
}