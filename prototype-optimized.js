// 극도로 최적화된 파일 업로드 앱
function fileApp(){return{
uploadedFiles:[],selectedFiles:new Set(),lastIdx:-1,rowFiles:{},
dragging:false,dragOver:false,uploadDrag:false,
modalOpen:false,modalFiles:[],
mailRecipients:'',mailComment:'',
today:new Date().toISOString().split('T')[0],
// 정렬 관련 상태
sortBy:'seqno',
sortOrder:'asc',
tableData:[
{id:1,status:'처리완료',seqno:'20241028008001',code:'9MAD0002310',name:'매드스퀘어카리스아카디아뷰티젤리블러셔#스플렌더',docType:'성분표',note:'',exportCountry:'미국',docManager:'김담당',comment:''},
{id:2,status:'처리완료',seqno:'20241028008002',code:'9MAD0002710',name:'매드스퀘어카리스아카디아뷰티젤리블러셔#아이딜',docType:'원산지증명',note:'긴급',exportCountry:'일본',docManager:'이담당',comment:'빠른 처리 필요'},
{id:3,status:'처리완료',seqno:'20241028008003',code:'9MAD0002610',name:'매드스퀘어카리스아카디아뷰티젤리블러셔#에덴',docType:'성분표',note:'',exportCountry:'중국',docManager:'박담당',comment:''},
{id:4,status:'처리완료',seqno:'20241028008004',code:'9MAD0002510',name:'매드스퀘어카리스아카디아뷰티젤리블러셔#유토피아',docType:'시험성적서',note:'',exportCountry:'베트남',docManager:'김담당',comment:''},
{id:5,status:'처리완료',seqno:'20241028008005',code:'9MAD0002410',name:'매드스퀘어카리스아카디아뷰티젤리블러셔#해븐',docType:'성분표',note:'재제출',exportCountry:'태국',docManager:'최담당',comment:'이전 서류 오류'},
{id:6,status:'접수',seqno:'2025110600306',code:'9CLO1359910',name:'콜리오구강청결제C캐리미어씨엠스5',docType:'GMP',note:'',exportCountry:'미국',docManager:'김담당',comment:''},
{id:7,status:'접수',seqno:'2025110600307',code:'9CLO1359910',name:'콜리오구강청결제C캐리미어씨엠스5',docType:'성분표',note:'',exportCountry:'캐나다',docManager:'이담당',comment:''},
{id:8,status:'접수',seqno:'2025110600308',code:'9CLO1359910',name:'콜리오구강청결제C캐리미어씨엠스5',docType:'원산지증명',note:'',exportCountry:'호주',docManager:'박담당',comment:''},
{id:9,status:'회신',seqno:'2025110506401',code:'110128',name:'EN TANGERINE VITA C',docType:'성분표',note:'보완요청',exportCountry:'미국',docManager:'최담당',comment:'성분 추가 기재'},
{id:10,status:'회신',seqno:'2025110506402',code:'110128',name:'EN TANGERINE VITA C',docType:'시험성적서',note:'',exportCountry:'일본',docManager:'김담당',comment:''},
{id:11,status:'보완',seqno:'2025110506403',code:'101590',name:'BLACKHEAD EXFOLIATING SCRUB',docType:'GMP',note:'서류누락',exportCountry:'중국',docManager:'이담당',comment:'인증서 첨부 필요'},
{id:12,status:'보완',seqno:'2025110506404',code:'101590',name:'BLUE MEDINA TEA',docType:'성분표',note:'',exportCountry:'싱가포르',docManager:'박담당',comment:''},
{id:13,status:'접수',seqno:'2025110506405',code:'101590',name:'BERBER PORTRAIT',docType:'원산지증명',note:'',exportCountry:'홍콩',docManager:'최담당',comment:''},
{id:14,status:'접수',seqno:'2025110506406',code:'101590',name:'ROSE PICKER',docType:'성분표',note:'',exportCountry:'대만',docManager:'김담당',comment:''},
{id:15,status:'접수',seqno:'2025110506407',code:'101590',name:'CLEANSING FOAM BE CLEAN',docType:'시험성적서',note:'긴급',exportCountry:'필리핀',docManager:'이담당',comment:'긴급 수출 건'}
],
handleUpload(e){
const files=e.dataTransfer?.files||e.target.files;
if(!files)return;
this.uploadDrag=false;
Array.from(files).forEach((f,i)=>{
this.uploadedFiles.push({
id:Date.now()+i,
file:f,
name:f.name,
size:this.formatSize(f.size),
ext:f.name.split('.').pop().toUpperCase()
})
})
},
selectFile(e,id,idx){
if(e.ctrlKey||e.metaKey){
this.selectedFiles.has(id)?this.selectedFiles.delete(id):this.selectedFiles.add(id);
this.lastIdx=idx
}else if(e.shiftKey&&this.lastIdx!==-1){
const start=Math.min(this.lastIdx,idx),end=Math.max(this.lastIdx,idx);
for(let i=start;i<=end;i++)this.selectedFiles.add(this.uploadedFiles[i].id)
}else{
this.selectedFiles.clear();
this.selectedFiles.add(id);
this.lastIdx=idx
}
},
dragStart(e,id){
if(!this.selectedFiles.has(id)){
this.selectedFiles.clear();
this.selectedFiles.add(id)
}
this.dragging=true;
e.dataTransfer.effectAllowed='copy';
e.dataTransfer.setData('text/plain',JSON.stringify([...this.selectedFiles]))
},
dropFiles(e,rowId){
this.dragOver=false;
this.dragging=false;
try{
const ids=JSON.parse(e.dataTransfer.getData('text/plain'));
if(!this.rowFiles[rowId])this.rowFiles[rowId]=[];
ids.forEach(id=>{
if(!this.rowFiles[rowId].includes(id))this.rowFiles[rowId].push(id)
})
}catch(err){console.error(err)}
},
getFile(id){return this.uploadedFiles.find(f=>f.id===id)},
getShortName(name){return name?(name.length>20?name.substring(0,20)+'...':name):''},
showModal(rowId){
const ids=this.rowFiles[rowId]||[];
this.modalFiles=ids.map(id=>this.getFile(id)).filter(f=>f);
this.modalOpen=true
},
formatSize(bytes){
if(bytes<1024)return bytes+' B';
if(bytes<1024*1024)return(bytes/1024).toFixed(1)+' KB';
return(bytes/(1024*1024)).toFixed(1)+' MB'
},
removeFileFromRow(rowId,fileId){
if(!this.rowFiles[rowId])return;
this.rowFiles[rowId]=this.rowFiles[rowId].filter(id=>id!==fileId)
},
// 정렬 함수
sortTable(field){
if(this.sortBy===field){
this.sortOrder=this.sortOrder==='asc'?'desc':'asc'
}else{
this.sortBy=field;
this.sortOrder='asc'
}
},
// 정렬된 테이블 데이터 (computed property 역할)
get sortedTableData(){
const sorted=[...this.tableData].sort((a,b)=>{
let aVal=a[this.sortBy];
let bVal=b[this.sortBy];
// 문자열 비교
if(typeof aVal==='string'){
aVal=aVal.toLowerCase();
bVal=bVal.toLowerCase()
}
if(this.sortOrder==='asc'){
return aVal>bVal?1:aVal<bVal?-1:0
}else{
return aVal<bVal?1:aVal>bVal?-1:0
}
});
return sorted
},
// 정렬 아이콘 표시
getSortIcon(field){
if(this.sortBy!==field)return '⇅';
return this.sortOrder==='asc'?'▲':'▼'
}
}}
