import { ref, computed, onMounted } from 'vue';

export const useCardFlipLogic = () => {

const ROWS = 5;
const COLS = 9;

// アイテムの定義（アセット画像に合わせて修正）
const ITEM_TYPES = [
  { id: 'item-lg', name: 'ノート', width: 3, height: 2, image: '/assets/card-flip/2x3note.png' },
  { id: 'item-md', name: '銃', width: 3, height: 1, image: '/assets/card-flip/1x3weapon.png' },
  { id: 'item-sm', name: 'アイテム', width: 2, height: 1, image: '/assets/card-flip/1x2item.png' },
];

const board = ref([]);
const selectedCells = ref([]);
const isCleared = ref(false);
const placedItems = ref([]);

// パネルの色を斜めに配置するロジック
const getCellColor = (r, c) => {
  const colors = ['#b8e1ff', '#fff4ad', '#f5b8ff']; // 青, 黄, 桃
  // (r + c) の代わりに (c - r) を使うことで左上から右下への斜めラインを作る
  // 負の数対策で +ROWS を加算
  return colors[(c - r + ROWS) % 3];
};

const initBoard = () => {
  isCleared.value = false;
  selectedCells.value = [];
  placedItems.value = [];

  const newBoard = [];
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
      row.push({
        isOpen: false,
        itemId: null,
        isItem: false,
        typeId: null,
        originR: 0,
        originC: 0,
        isRotated: false,
        color: getCellColor(r, c)
      });
    }
    newBoard.push(row);
  }
  board.value = newBoard;

  ITEM_TYPES.forEach(type => {
    const count = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < count; i++) {
      tryPlaceItemRandomly(type, `${type.id}-${i}`);
    }
  });
};

const tryPlaceItemRandomly = (type, instanceId) => {
  const maxAttempts = 100;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const rotate = Math.random() > 0.5;
    const finalWidth = rotate ? type.height : type.width;
    const finalHeight = rotate ? type.width : type.height;

    const r = Math.floor(Math.random() * (ROWS - finalHeight + 1));
    const c = Math.floor(Math.random() * (COLS - finalWidth + 1));

    let canPlace = true;
    for (let dr = 0; dr < finalHeight; dr++) {
      for (let dc = 0; dc < finalWidth; dc++) {
        if (board.value[r + dr][c + dc].isItem) {
          canPlace = false;
          break;
        }
      }
      if (!canPlace) break;
    }

    if (canPlace) {
      registerItem(r, c, type, instanceId, rotate);
      return;
    }
  }
};

const registerItem = (row, col, type, instanceId, rotate) => {
  const cells = [];
  const finalWidth = rotate ? type.height : type.width;
  const finalHeight = rotate ? type.width : type.height;

  for (let dr = 0; dr < finalHeight; dr++) {
    for (let dc = 0; dc < finalWidth; dc++) {
      const cell = board.value[row + dr][col + dc];
      cell.isItem = true;
      cell.itemId = instanceId;
      cell.typeId = type.id;
      cell.originR = dr;
      cell.originC = dc;
      cell.isRotated = rotate;
      cells.push({ r: row + dr, c: col + dc });
    }
  }
  placedItems.value.push({
    id: instanceId,
    typeId: type.id,
    name: type.name,
    cells,
    width: finalWidth,
    height: finalHeight,
    originalType: type // 画像パス参照用
  });
};

// 画像の背景スタイルを計算
const getItemImageStyle = (cell) => {
  const item = placedItems.value.find(i => i.id === cell.itemId);
  if (!item) return {};

  const { originR, originC, isRotated } = cell;
  const type = item.originalType;

  // 背景画像の表示倍率と位置を計算
  // 1マスを100%として、アイテムの全サイズ分（width x height）の背景サイズを設定
  const bgSizeW = (isRotated ? type.height : type.width) * 100;
  const bgSizeH = (isRotated ? type.width : type.height) * 100;
  const posX = (originC / ((isRotated ? type.height : type.width) - 1 || 1)) * 100;
  const posY = (originR / ((isRotated ? type.width : type.height) - 1 || 1)) * 100;

  return {
    backgroundImage: `url(${type.image})`,
    backgroundSize: `${bgSizeW}% ${bgSizeH}%`,
    backgroundPosition: `${posX}% ${posY}%`,
    // 回転している場合は画像自体を回転させる（必要に応じて）
    transform: isRotated ? 'rotate(0deg)' : 'rotate(0deg)',
    backgroundRepeat: 'no-repeat'
  };
};

const itemStatusList = computed(() => {
  return ITEM_TYPES.map(type => {
    const instances = placedItems.value.filter(item => item.typeId === type.id);
    const remaining = instances.filter(item =>
      !item.cells.every(pos => board.value[pos.r][pos.c].isOpen)
    ).length;
    return { ...type, remaining };
  });
});

const totalCells = ROWS * COLS;
const openedCount = computed(() => board.value.flat().filter(c => c.isOpen).length);
const remainingItemsCount = computed(() => {
  return itemStatusList.value.reduce((acc, curr) => acc + curr.remaining, 0);
});

const toggleCellSelection = (r, c) => {
  if (board.value[r][c].isOpen) return;
  const index = selectedCells.value.findIndex(cell => cell.r === r && cell.c === c);
  if (index > -1) selectedCells.value.splice(index, 1);
  else selectedCells.value.push({ r, c });
};

const isSelected = (r, c) => selectedCells.value.some(cell => cell.r === r && cell.c === c);

const openSelectedCells = () => {
  selectedCells.value.forEach(pos => { board.value[pos.r][pos.c].isOpen = true; });
  selectedCells.value = [];
  checkClear();
};

const checkClear = () => {
  if (remainingItemsCount.value === 0 && placedItems.value.length > 0) isCleared.value = true;
};

onMounted(() => initBoard());

return {
    board,
    selectedCells,
    isCleared,
    initBoard,
    getItemImageStyle,
    itemStatusList,
    totalCells,
    openedCount,
    toggleCellSelection,
    isSelected,
    openSelectedCells
  };
}
