
export function sidebar(){
  console.log('test sidebar');
}

export function sidebarCheck() {
  document.getElementById('sidebar').onclick = function(){
    console.log('sidebar check called');
  }
}
