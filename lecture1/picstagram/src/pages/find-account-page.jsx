import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/**
 * FindAccountPage 컴포넌트
 * 아이디/비밀번호 찾기 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <FindAccountPage />
 */
function FindAccountPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [newId, setNewId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleFindId = () => {
    if (phone) {
      setStep(2);
    }
  };

  const handleFindPassword = () => {
    if (nickname && phone) {
      setStep(2);
    }
  };

  const handleConfirm = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* 상단바 */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 1,
            py: 1,
            minHeight: '44px',
          }}
        >
          <IconButton onClick={() => (step === 1 ? navigate(-1) : setStep(1))}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h3" sx={{ fontWeight: 600, flex: 1, textAlign: 'center', mr: 5 }}>
            계정 찾기
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="xs" sx={{ pt: 4 }}>
        {step === 1 ? (
          <>
            {/* 탭 메뉴 */}
            <Tabs
              value={activeTab}
              onChange={(e, v) => setActiveTab(v)}
              variant="fullWidth"
              sx={{ mb: 4 }}
            >
              <Tab label="아이디 찾기" />
              <Tab label="비밀번호 찾기" />
            </Tabs>

            {activeTab === 0 ? (
              /* 아이디 찾기 */
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                  가입할 때 사용한 휴대폰 번호를 입력하세요.
                </Typography>
                <TextField
                  fullWidth
                  placeholder="휴대폰 번호"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{ mb: 2 }}
                  size="small"
                />
                <Button
                  fullWidth
                  variant="contained"
                  disabled={!phone}
                  onClick={handleFindId}
                >
                  계속
                </Button>
              </Box>
            ) : (
              /* 비밀번호 찾기 */
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                  닉네임과 휴대폰 번호를 입력하세요.
                </Typography>
                <TextField
                  fullWidth
                  placeholder="닉네임"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  sx={{ mb: 1.5 }}
                  size="small"
                />
                <TextField
                  fullWidth
                  placeholder="휴대폰 번호"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{ mb: 2 }}
                  size="small"
                />
                <Button
                  fullWidth
                  variant="contained"
                  disabled={!nickname || !phone}
                  onClick={handleFindPassword}
                >
                  계속
                </Button>
              </Box>
            )}
          </>
        ) : (
          /* 새 정보 입력 단계 */
          <Box>
            {activeTab === 0 ? (
              /* 새 아이디 설정 */
              <>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
                  새 아이디 설정
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                  사용할 새 아이디를 입력하세요.
                </Typography>
                <TextField
                  fullWidth
                  placeholder="새 아이디"
                  value={newId}
                  onChange={(e) => setNewId(e.target.value)}
                  sx={{ mb: 2 }}
                  size="small"
                />
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2, borderColor: 'divider', color: 'text.primary' }}
                >
                  중복 확인
                </Button>
              </>
            ) : (
              /* 새 비밀번호 설정 */
              <>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
                  새 비밀번호 설정
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                  새 비밀번호를 입력하세요.
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="새 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ mb: 1.5 }}
                  size="small"
                />
                <TextField
                  fullWidth
                  type="password"
                  placeholder="새 비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ mb: 2 }}
                  size="small"
                />
              </>
            )}

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{ borderColor: 'divider', color: 'text.primary' }}
              >
                취소
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={handleConfirm}
                disabled={activeTab === 0 ? !newId : !newPassword || newPassword !== confirmPassword}
              >
                확인
              </Button>
            </Box>
          </Box>
        )}

        {/* 로그인 링크 */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="primary">
              로그인으로 돌아가기
            </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default FindAccountPage;
