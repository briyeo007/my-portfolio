import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

/**
 * ModalSection 컴포넌트
 * MUI Dialog를 사용한 모달 섹션
 *
 * 기능:
 * - 열기/닫기 버튼
 * - DialogTitle, DialogContent, DialogActions 구조
 * - 배경 클릭으로 닫기 가능
 */
function ModalSection() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    alert('확인 버튼이 클릭되었습니다!');
    setOpen(false);
  };

  return (
    <Box sx={{ mb: { xs: 4, md: 6 } }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          mb: 3,
          pb: 1,
          borderBottom: '2px solid',
          borderColor: 'primary.main'
        }}
      >
        Modal
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="contained" onClick={handleOpen}>
          모달 열기
        </Button>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ alignSelf: 'center' }}
        >
          배경 클릭 또는 ESC 키로 닫을 수 있습니다
        </Typography>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-dialog-title"
        aria-describedby="modal-dialog-description"
      >
        <DialogTitle id="modal-dialog-title">
          모달 제목
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="modal-dialog-description">
            이것은 MUI Dialog 컴포넌트를 사용한 모달입니다.
            DialogTitle, DialogContent, DialogActions 구조로 되어 있으며,
            배경을 클릭하거나 ESC 키를 눌러 닫을 수 있습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            취소
          </Button>
          <Button onClick={handleConfirm} variant="contained" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ModalSection;
