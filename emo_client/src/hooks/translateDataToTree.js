

/**
 * 该方法用于将有父子关系的数组转换成树形结构的数组
 * 接收一个具有父子关系的数组作为参数
 * 返回一个树形结构的数组
 */
//  module.exports = (data) => {
// 	//没有父节点的数据
// 	let parents = data.filter(value => value.commentId === '0' )
   
// 	//有父节点的数据
// 	let children = data.filter(value => value.commentId !== '0')
   
// 	//定义转换方法的具体实现
// 	let translator = (parents, children) => {
// 	  //遍历父节点数据
// 	  parents.forEach((parent) => {
// 		//遍历子节点数据
// 		children.forEach((current, index) => {
// 		  //此时找到父节点对应的一个子节点
// 		  if (current.commentId == parent._id) {
// 			//对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
// 			let temp = JSON.parse(JSON.stringify(children))
// 			//让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
// 			temp.splice(index, 1)
// 			//让当前子节点作为唯一的父节点，去递归查找其对应的子节点
// 			translator([current], temp)
// 			//把找到子节点放入父节点的children属性中
//             console.log()

//             if(typeof parent.children=='undefined'){
//                 let arr = []
//                 arr.push(current)
//                 parent["children"] = arr
//             }else{
//                 parent.children.push(current)
//             }

// 		  }
// 		}
// 		)
// 	  }
// 	  )
// 	}
   
// 	//调用转换方法
// 	translator(parents, children)
   
// 	//返回最终的结果
//     console.log(parents)

// 	return parents
//   }

/**
  * 将一维的扁平数组转换为多层级对象
  * @param {[type]} list 一维数组，数组中每一个元素需包含id和parent_id两个属性 
  * @return {[type]} tree 多层级树状结构
  */
  module.exports =  (list) => {
    const res = [];
    const map = list.reduce((res, v) => (res[v._id] = v, res), {});

    for (const item of list) {
      if (item.commentId == '0') {
        res.push(item);
        continue;
      }
      if (item.commentId in map) {
        const parent = map[item.commentId];
        parent.children = parent.children || [];
        parent.children.push(item);
      }
    }
    return res;
 }