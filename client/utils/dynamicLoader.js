
// const cached = {};

// function registerModel(app, model) {
//   model = model.default || model;
//   if (!cached[model.namespace]) {
//     app.model(model);
//     cached[model.namespace] = 1;
//   }
// }

// const dynamicLoader = (app, modelNameList, componentName) => {
//     let loader = {};
//     let models = [];
//     let fn = (path, prefix) => {
//         return () => import(`./${prefix}/${path}`);
//     };

//     if (modelNameList && modelNameList.length > 0) {
//         for (let i in modelNameList) {
//             if (modelNameList.hasOwnProperty(i)) {
//                 let model = modelNameList[i];
//                 if (loader[model] === undefined) {
//                     loader[model] = fn(model, 'models');
//                     models.push(model);
//                 }
//             }
//         }
//     }

//     loader[componentName] = fn(componentName, 'routes');

//     return Loadable.Map({
//         loader: loader,
//         loading: Loading,
//         render(loaded, props) {
//             let C = loaded[componentName].default;

//             for (let i in models) {
//                 if (models.hasOwnProperty(i)) {
//                     let model = models[i];
//                     if (loaded[model] && getApp()) {
//                         registerModel(app, loaded[model]);
//                     }
//                 }
//             }
//             return;
//         },
//     })
// }
// export default dynamicLoader