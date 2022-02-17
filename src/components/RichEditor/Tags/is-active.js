/**
 * @description 检查选区是否在链接中，即菜单是否应该 active
 * @author wangfupeng
 */

 function isActive(editor) {
     const $selectionELem = editor.selection.getSelectionContainerElem()
     if (!$selectionELem?.length) {
         return false
     }
     if ($selectionELem.getNodeName() === 'DRAWER' || $selectionELem.getNodeName() === 'SETTING') {
         return true
     } else {
         return false
     }
 }
 
 export default isActive