import { useSelector } from "react-redux"
import { Redirect, Route, Switch, useHistory } from "react-router"

import { SiteMainLayout } from "../components/layouts/index"
import { SiteMainSidebar } from "../components/layouts/Sidebars";

// pages : assets 
import { DashboardAssetsPage } from "../views/pages/dash-assets";


import { BrandingPage } from "../pages/BrandingPage";

import { DashboardPage } from "../views/pages/dashboard";

import { AuthPage } from "../views/pages/auth";
import Items from "../components/items";
import { AssetMappers } from "../components/layouts/Mappers";

import { DeliveryProvidersPage } from "../pages/DeliveryProvidersPage";
import { DeliveryAddProviderPage } from "../pages/DeliveryAddProviderPage";
import { CreateShopPage } from "../pages/CreateShopPage";



const Routee = ({ isPrivate, isLogged, title, children, ...rest }) => {


  return <Route
    render={() => isPrivate && isLogged ?
      <SiteMainLayout
        children={children}
        pageSidebar={<SiteMainSidebar />}
        title={title}
      /> :
      !isPrivate && !isLogged ? children
        : <Redirect to='/auth' />}
    {...rest}
  />
}

const Router = () => {
  const { logged } = useSelector(state => state.auth)

  const routeProps = { isLogged: logged }

  const privateRoute = { isPrivate: true, ...routeProps }
  const publicOnlyRoute = { isPrivate: false, ...routeProps }

  return (
    <Switch>

      <Routee {...privateRoute} exact path='/orders' ><div>Orders page</div></Routee>
      <Routee {...privateRoute} exact path='/products' ><div>Products page</div></Routee>



      <Routee title='Create delivery'
        children={<DeliveryAddProviderPage />}
        exact path='/delivery/add'  {...privateRoute}
      />
      <Routee title='Delivery companies'
        children={<DeliveryProvidersPage />}
        exact path='/delivery/list'  {...privateRoute}
      />



      <Routee title='Shop branding'
        children={<BrandingPage />}
        exact path='/shops/branding'  {...privateRoute}
      />
      <Routee title='Create shop'
        children={<CreateShopPage />}
        exact path='/shops/add'  {...privateRoute}
      />
      <Routee title='Shops list'
        children={<AssetMappers asset='shop' />}
        exact path='/shops/list'  {...privateRoute}
      />


      <Routee title='Create collection'
        children={<Items.Collection action='create' />}
        exact path='/assets/collections/add'  {...privateRoute}
      />
      <Routee title='Collections list'
        children={<AssetMappers asset='collection' />}
        exact path='/assets/collections'  {...privateRoute}
      />


      <Routee title='Create attribute'
        children={<Items.Attribute action='create' />}
        exact path='/assets/attributes/add'  {...privateRoute}
      />
      <Routee title='Attributes list'
        children={<AssetMappers asset='attribute' />}
        exact path='/assets/attributes'  {...privateRoute}
      />


      <Routee {...privateRoute} exact path='/assets'><DashboardAssetsPage /></Routee>

      <Routee  {...publicOnlyRoute} exact path='/auth'><AuthPage /> </Routee>

      <Routee
        {...privateRoute}
        exact path='/'
      >
        <DashboardPage />
      </Routee>
    </Switch>

  )
}

export default Router


