import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

/**
 * DragDropSection 컴포넌트
 * HTML5 Drag & Drop API를 사용한 드래그 앤 드롭 인터랙션 섹션
 *
 * Props:
 * @param {Array} initialItems - 초기 드래그 아이템 목록 [Optional, 기본값: 기본 아이템 3개]
 *
 * Example usage:
 * <DragDropSection />
 * <DragDropSection initialItems={[{ id: 1, label: '아이템1', color: '#1976d2' }]} />
 */
function DragDropSection({ initialItems }) {
  const defaultItems = [
    { id: 1, label: '아이템 1', color: '#1976d2' },
    { id: 2, label: '아이템 2', color: '#2e7d32' },
    { id: 3, label: '아이템 3', color: '#ed6c02' }
  ];

  const [items, setItems] = useState(initialItems || defaultItems);
  const [droppedItems, setDroppedItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item.id);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    if (draggedItem) {
      setItems((prev) => prev.filter((item) => item.id !== draggedItem.id));
      setDroppedItems((prev) => [...prev, draggedItem]);
      setDraggedItem(null);
    }
  };

  const handleReset = () => {
    setItems(initialItems || defaultItems);
    setDroppedItems([]);
  };

  return (
    <Box sx={{ width: '100%', py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          textAlign: 'center',
          mb: 4,
          fontWeight: 600,
          fontSize: { xs: '1.25rem', md: '1.5rem' }
        }}
      >
        Drag & Drop
      </Typography>

      <Grid container spacing={3}>
        {/* 드래그 가능한 아이템 영역 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, fontWeight: 500, color: 'text.secondary' }}
          >
            드래그 아이템
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              minHeight: 100,
              p: 2,
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              bgcolor: 'background.paper'
            }}
          >
            {items.map((item) => (
              <Paper
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onDragEnd={handleDragEnd}
                elevation={draggedItem?.id === item.id ? 8 : 2}
                sx={{
                  px: 3,
                  py: 2,
                  cursor: 'grab',
                  bgcolor: item.color,
                  color: 'white',
                  fontWeight: 500,
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  opacity: draggedItem?.id === item.id ? 0.5 : 1,
                  transform: draggedItem?.id === item.id ? 'scale(1.05)' : 'scale(1)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 4
                  },
                  '&:active': {
                    cursor: 'grabbing'
                  }
                }}
              >
                {item.label}
              </Paper>
            ))}
            {items.length === 0 && (
              <Typography sx={{ color: 'text.disabled', fontStyle: 'italic' }}>
                모든 아이템이 이동되었습니다
              </Typography>
            )}
          </Box>
        </Grid>

        {/* 드롭 영역 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, fontWeight: 500, color: 'text.secondary' }}
          >
            드롭 영역
          </Typography>
          <Paper
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            elevation={isDragOver ? 4 : 1}
            sx={{
              minHeight: 100,
              p: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center',
              justifyContent: droppedItems.length === 0 ? 'center' : 'flex-start',
              border: '2px dashed',
              borderColor: isDragOver ? 'primary.main' : 'divider',
              borderRadius: 2,
              bgcolor: isDragOver ? 'action.hover' : 'grey.50',
              transition: 'all 0.3s ease',
              transform: isDragOver ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            {droppedItems.length === 0 ? (
              <Typography sx={{ color: 'text.disabled' }}>
                여기에 아이템을 드롭하세요
              </Typography>
            ) : (
              droppedItems.map((item) => (
                <Paper
                  key={item.id}
                  elevation={2}
                  sx={{
                    px: 3,
                    py: 2,
                    bgcolor: item.color,
                    color: 'white',
                    fontWeight: 500,
                    borderRadius: 2
                  }}
                >
                  {item.label}
                </Paper>
              ))
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* 리셋 버튼 */}
      {droppedItems.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Paper
            component="button"
            onClick={handleReset}
            elevation={2}
            sx={{
              px: 4,
              py: 1.5,
              border: 'none',
              cursor: 'pointer',
              bgcolor: 'grey.200',
              borderRadius: 2,
              fontWeight: 500,
              fontSize: '0.875rem',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'grey.300',
                transform: 'translateY(-2px)',
                boxShadow: 2
              }
            }}
          >
            초기화
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default DragDropSection;
