import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../contexts/auth-context.jsx';
import { supabase } from '../lib/supabase.js';

/**
 * UploadPage 컴포넌트
 * 게시물 업로드 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <UploadPage />
 */
function UploadPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [likesHidden, setLikesHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...imageUrls].slice(0, 10));
    setSelectedFiles((prev) => [...prev, ...files].slice(0, 10));
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (step === 1 && selectedImages.length > 0) {
      setStep(2);
    }
  };

  const handleShare = async () => {
    if (!user) {
      setError('로그인이 필요합니다.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const uploadedUrls = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}_${i}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('posts')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('posts')
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrl);
      }

      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          caption: caption,
          location: location,
          comments_enabled: commentsEnabled,
          likes_hidden: likesHidden,
        })
        .select()
        .single();

      if (postError) throw postError;

      const imageInserts = uploadedUrls.map((url, index) => ({
        post_id: post.id,
        image_url: url,
        image_order: index,
      }));

      const { error: imagesError } = await supabase
        .from('post_images')
        .insert(imageInserts);

      if (imagesError) throw imagesError;

      if (caption) {
        const hashtags = caption.match(/#[\w가-힣]+/g) || [];
        for (const tag of hashtags) {
          const tagName = tag.slice(1);

          const { data: existingTag } = await supabase
            .from('hashtags')
            .select('id')
            .eq('name', tagName)
            .single();

          let hashtagId;
          if (existingTag) {
            hashtagId = existingTag.id;
          } else {
            const { data: newTag } = await supabase
              .from('hashtags')
              .insert({ name: tagName })
              .select()
              .single();
            hashtagId = newTag?.id;
          }

          if (hashtagId) {
            await supabase
              .from('post_hashtags')
              .insert({ post_id: post.id, hashtag_id: hashtagId });
          }
        }
      }

      navigate('/main');
    } catch (err) {
      console.error('Upload error:', err);
      setError('게시물 업로드에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>로그인이 필요합니다.</Typography>
      </Box>
    );
  }

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
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          zIndex: 100,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1,
            py: 1,
            minHeight: '44px',
          }}
        >
          <IconButton
            onClick={() => (step === 1 ? navigate(-1) : setStep(1))}
            disabled={loading}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            {step === 1 ? '새 게시물' : '새 게시물'}
          </Typography>
          {step === 1 ? (
            <Button
              disabled={selectedImages.length === 0}
              onClick={handleNext}
              sx={{ fontWeight: 600 }}
            >
              다음
            </Button>
          ) : (
            <Button
              onClick={handleShare}
              sx={{ fontWeight: 600 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : '공유'}
            </Button>
          )}
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      )}

      {step === 1 ? (
        /* 이미지 선택 단계 */
        <Box sx={{ p: 2 }}>
          {/* 선택된 이미지 미리보기 */}
          {selectedImages.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  overflowX: 'auto',
                  pb: 1,
                }}
              >
                {selectedImages.map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      component="img"
                      src={img}
                      alt={`Selected ${index + 1}`}
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        bgcolor: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                        width: 20,
                        height: 20,
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        bottom: 4,
                        left: 4,
                        bgcolor: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        px: 0.5,
                        borderRadius: 0.5,
                      }}
                    >
                      {index + 1}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* 이미지 선택 버튼 */}
          <Box
            component="label"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 300,
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              cursor: 'pointer',
              '&:hover': { borderColor: 'primary.main' },
            }}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleImageSelect}
            />
            <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              사진을 선택하세요
            </Typography>
            <Typography variant="caption" color="text.secondary">
              최대 10장까지 선택 가능
            </Typography>
          </Box>
        </Box>
      ) : (
        /* 게시물 정보 입력 단계 */
        <Box>
          {/* 선택된 이미지 & 캡션 */}
          <Box sx={{ display: 'flex', p: 2, gap: 2 }}>
            <Box
              component="img"
              src={selectedImages[0]}
              alt="Preview"
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="문구를 작성하세요... #해시태그 추가 가능"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              variant="standard"
              InputProps={{ disableUnderline: true }}
              disabled={loading}
            />
          </Box>

          <Divider />

          {/* 위치 추가 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              cursor: 'pointer',
            }}
          >
            <LocationOnOutlinedIcon sx={{ mr: 2, color: 'text.secondary' }} />
            <TextField
              fullWidth
              placeholder="위치 추가"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              variant="standard"
              InputProps={{ disableUnderline: true }}
              disabled={loading}
            />
          </Box>

          <Divider />

          {/* 사람 태그 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              cursor: 'pointer',
            }}
          >
            <PersonAddAltOutlinedIcon sx={{ mr: 2, color: 'text.secondary' }} />
            <Typography color="text.secondary">사람 태그하기</Typography>
          </Box>

          <Divider />

          {/* 추가 옵션 */}
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
              고급 설정
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography variant="body2">좋아요 수 숨기기</Typography>
              <Switch
                checked={likesHidden}
                onChange={(e) => setLikesHidden(e.target.checked)}
                disabled={loading}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2">댓글 기능 해제</Typography>
              <Switch
                checked={!commentsEnabled}
                onChange={(e) => setCommentsEnabled(!e.target.checked)}
                disabled={loading}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default UploadPage;
