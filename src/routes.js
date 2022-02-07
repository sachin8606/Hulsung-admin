/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/sidebar_components/Profile";
import Icons from "views/sidebar_components/Icons.js";
import Categories from "views/sidebar_components/Categories";
import Addrootcategory from "views/componentStructure.js/RootCategories/Addrootcategory";
import EditRootCategory from "views/componentStructure.js/RootCategories/EditRootCategory";
import Products from "views/sidebar_components/Products";
import AddProduct from "views/componentStructure.js/Product/AddProduct";
import EditProduct from "views/componentStructure.js/Product/EditProduct";
import Users from "views/sidebar_components/Users";
import Vendors from "views/sidebar_components/Vendors";
import AddVendor from "views/componentStructure.js/Vendors/AddVendor";
import AddUser from "views/componentStructure.js/Users/AddUser";



var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2",
    component: Index,
    layout: "/admin",
    active: true
  },
  {
    path: "/icons",
    name: "icons",
    icon: "ni ni-tv-2",
    component: Icons,
    layout: "/admin",
    active: true
  },



  // Category Related
  {
    path:"/categories",
    name:"Categories",
    icon:"ni ni-collection text-red",
    component: Categories,
    layout:"/admin",
    active:true

  },
  {
    path: "/addRootCategory",
    name: "Add root Category",
    icon: "ni ni-single-02 text-yellow",
    component: Addrootcategory,
    layout: "/admin",
    active:false
  },
  {
    path: "/editRootCategory/:id",
    name: "Edit Root Category",
    icon: "ni ni-single-02 text-yellow",
    component: EditRootCategory,
    layout: "/admin",
    active:false
  },

  // Products Related

  {
    path:"/products",
    name:"Products",
    icon:"ni ni-shop text-red",
    component: Products,
    layout:"/admin",
    active:true
  },
  {
    path: "/addProduct",
    name: "Add Product",
    icon: "ni ni-single-02 text-black",
    component: AddProduct,
    layout: "/admin",
    active:false
  },
  {
    path:"/editProduct/:SKU",
    name:"Edit Products",
    component: EditProduct,
    layout:"/admin",
    active:false
  },

  //  User Related

  {
    path:"/users",
    name:"Users",
    icon:"ni ni-single-02 text-red",
    component: Users,
    layout:"/admin",
    active:true
  },
  {
    path:"/addUser",
    name:"Add User",
    icon:"ni ni-single-02 text-red",
    component: AddUser,
    layout:"/admin",
    active:false
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    active:true
  },



  // Vendors

  {
    path:"/vendors",
    name:"Vendors",
    icon:"ni ni-ui-04 text-blue",
    component: Vendors,
    layout:"/admin",
    active:true
  },
  {
    path:"/addVendor",
    name:"Add Vendors",
    icon:"ni ni-ui-04 text-blue",
    component: AddVendor,
    layout:"/admin",
    active:false
  },
];
export default routes;
