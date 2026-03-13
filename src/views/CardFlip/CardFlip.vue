<script setup>
import { useCardFlipLogic } from '../../composables/CardFlip/CardFlip.composable';

const {
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
    openSelectedCells,
  } = useCardFlipLogic();

</script>

<template>
  <div class="game-container">
    <div class="header">
      <div class="info-row">
        <span>残りマス数：{{ totalCells - openedCount }}/{{ totalCells }}</span>
      </div>
    </div>

    <div class="board">
      <div v-for="(row, r) in board" :key="r" class="row">
        <div
          v-for="(cell, c) in row"
          :key="c"
          class="cell"
          :class="{
            'is-open': cell.isOpen,
            'is-selected': isSelected(r, c),
            'has-item': cell.isItem && cell.isOpen
          }"
          :style="{ backgroundColor: cell.isOpen ? 'transparent' : cell.color }"
          @click="toggleCellSelection(r, c)"
        >
          <div
            v-if="cell.isOpen && cell.isItem"
            class="item-image-fragment"
            :style="getItemImageStyle(cell)"
          ></div>
          <div v-if="!cell.isOpen" class="corner"></div>
        </div>
      </div>
    </div>

    <div class="item-catalog">
      <div v-for="item in itemStatusList" :key="item.id" class="catalog-card" :class="{ 'is-complete': item.remaining === 0 }">
        <div class="catalog-shape">
          <div class="shape-grid" :style="{ gridTemplateColumns: `repeat(${item.width}, 1fr)` }">
            <div v-for="n in (item.width * item.height)" :key="n" class="shape-dot"></div>
          </div>
        </div>
        <div class="catalog-info">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-count">× {{ item.remaining }}</div>
        </div>
      </div>
    </div>

    <div class="controls">
      <div class="button-group">
        <button class="open-button" :disabled="selectedCells.length === 0 || isCleared" @click="openSelectedCells">
          {{ selectedCells.length > 0 ? `${selectedCells.length}枚めくる` : 'めくる' }}
        </button>
        <button class="reset-button" @click="initBoard">リセット</button>
      </div>
    </div>

    <div v-if="isCleared" class="clear-message">MISSION COMPLETE!</div>
  </div>
</template>

<style scoped>
.game-container { display: flex; flex-direction: column; align-items: center; padding: 40px 20px; background-color: #f8fbff; min-height: 100vh; box-sizing: border-box; }
.header { width: 100%; max-width: 500px; margin-bottom: 15px; }
.info-row { display: flex; justify-content: center; width: 100%; font-weight: bold; font-size: 1.1rem; color: #444; }
.board { display: grid; gap: 4px; padding: 10px; background: white; border: 1px solid #e0e6ed; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.row { display: flex; gap: 4px; }
.cell {
  width: 45px; height: 45px; position: relative; cursor: pointer; border-radius: 2px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s ease;
}
.cell.is-selected { outline: 3px solid #4a90e2; z-index: 5; transform: scale(1.1); box-shadow: 0 0 10px rgba(74, 144, 226, 0.5); }
.cell.has-item { background-color: #fff !important; overflow: hidden; }
.cell.is-open { background-color: #fafafa !important; }

.item-image-fragment {
  width: 100%;
  height: 100%;
}

.item-catalog { display: flex; gap: 12px; margin: 20px 0; padding: 15px; background: #fff; border-radius: 8px; border: 1px dashed #ccd6e0; flex-wrap: wrap; justify-content: center; }
.catalog-card { display: flex; align-items: center; gap: 12px; padding: 8px 15px; background: #fdfdfd; border: 1px solid #eee; border-radius: 4px; min-width: 120px; }
.catalog-card.is-complete { opacity: 0.3; filter: grayscale(1); }
.catalog-info { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.2; }
.item-name { font-size: 0.7rem; font-weight: bold; color: #888; white-space: nowrap; }
.item-count { font-size: 1.1rem; font-weight: 800; color: #4a90e2; }

.shape-grid { display: grid; gap: 2px; }
.shape-dot { width: 7px; height: 7px; background: #4a90e2; border-radius: 1px; }

.controls { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.button-group { display: flex; gap: 12px; }
.open-button { background: #333; color: white; padding: 12px 24px; min-width: 140px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; }
.open-button:disabled { background: #ccc; cursor: not-allowed; }
.reset-button { background: #eee; color: #666; border: none; padding: 12px 20px; border-radius: 4px; cursor: pointer; }

.clear-message { margin-top: 20px; font-size: 1.8rem; color: #4a90e2; font-weight: 800; }
.corner { position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; background: linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%); }
</style>
