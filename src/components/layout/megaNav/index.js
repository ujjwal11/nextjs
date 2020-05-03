// import "./header.scss";
import Link from 'next/link'
import _ from 'lodash';
import React from 'react'
import { Router } from '../../../../routes'

class  MegaNav extends React.Component {
  constructor(props){
    super(props)

    this.state={
      megaNavSabMenu : false,
      megaNavSabMenuId : '' 
    }
  }

  handleClickCat = (e, catId, index, currentKey) => {
    const {megaNavSabMenu} = this.state
    e.preventDefault()
    this.setState({
      megaNavSabMenu : !megaNavSabMenu,
      megaNavSabMenuId : currentKey
    })
    Router.pushRoute(`/products/${catId}`)
  }

  handleClickSubCat = (e, catId, subCatId) => {
    e.preventDefault()
    Router.pushRoute(`/products/${catId}/${subCatId}`)
  }
  
  handleClickChildCat = (e, catId, subCatId, childSubCatId) => {
    e.preventDefault()
    Router.pushRoute(`/products/${catId.toLowerCase()}/${subCatId.toLowerCase()}/${childSubCatId}`)
  }

    render(){
      const data = this.props.data
    //  if(data !== null || undefined)
      return (
          data.
            filter(item => item.inStock).
            map((item, i) => (
                <li className={this.state.megaNavSabMenuId === item.categoryId && this.state.megaNavSabMenu ? "nav-item dropdown position-static show" : "nav-item dropdown position-static"} key={i} >
                  <a className="nav-link dropdown-toggle"
                    href={`/products/${item.slug}`}
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    onClick={e => this.handleClickCat(e, item.slug, i, item.categoryId)}
                    aria-expanded={this.state.megaNavSabMenuId === item.categoryId && this.state.megaNavSabMenu ? "true" : "false"}
                  >
                    {item.categoryName}
                  </a>
                  {item.childCategories !== null ? (
                    <div className={this.state.megaNavSabMenuId === item.categoryId && this.state.megaNavSabMenu ? "dropdown-menu w-100 show" : "dropdown-menu w-100"} aria-labelledby="navbarDropdown" data-section-nav={item.displayName}>
                      <div className="categroryBox" >
                        {item.childCategories &&
                          _.uniqBy(item.childCategories, 'categoryId').
                            filter(cat => cat.inStock).
                            map(cat => (
                              <div className="inline category-Panel" key={cat.categoryId}>
                                <h4><a href={`/products/${item.slug}/${cat.slug}`} onClick={e => this.handleClickSubCat(e, item.slug, cat.slug)}>{cat.categoryName}</a></h4>
                                <ul>
                                  {cat.childCategories !== null
                                    ? cat.childCategories.
                                      filter(subCat => subCat.inStock).
                                      map(subCat => (
                                        <li key={subCat.categoryId}>
                                          <a
                                            href={`/products/${item.categoryName}/${cat.categoryName}/${subCat.slug}`}
                                            onClick={e => this.handleClickChildCat(e, item.categoryName, cat.categoryName, subCat.slug)}
                                          >
                                            {subCat.categoryName}
                                          </a>
                                        </li>
                                      ))
                                    : null}
                                </ul>
                              </div>
                            ))}
                      </div>
                    </div>
                  ) : null}
                </li>
              ))
          
      );
    }
}

export default MegaNav;