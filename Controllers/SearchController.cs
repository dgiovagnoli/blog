﻿using System.Web.Mvc;
using Umbraco.Web.Mvc;
using CSharpProject.Models;
using Umbraco.Web;
using CSharpProject.Helpers;
using System.Collections.Generic;


namespace CSharpProject.Controllers
{
    public class SearchController : SurfaceController
    {
        #region Private Variables and Methods

        private SearchHelper _searchHelper { get { return new SearchHelper(new UmbracoHelper(UmbracoContext.Current)); } }

        private string PartialViewPath(string name)
        {
            return $"~/Views/Partials/Search/{name}.cshtml";
        }

        private string PartialViewBlogPath(string name)
        {
            return $"~/Views/Partials/Blog/{name}.cshtml";
        }

        private List<SearchGroup> GetSearchGroups(SearchViewModel model)
        {
            List<SearchGroup> searchGroups = null;
            if (!string.IsNullOrEmpty(model.FieldPropertyAliases))
            {
                searchGroups = new List<SearchGroup>();
                searchGroups.Add(new SearchGroup(model.FieldPropertyAliases.Split(','), model.SearchTerm.Split(' ')));
            }

            if (!string.IsNullOrEmpty(model.Category))
            {
                if(searchGroups == null)
                {
                    searchGroups = new List<SearchGroup>();
                }
                searchGroups.Add(new SearchGroup(new string[] { "category" }, new string[] { model.Category }));
            }



            return searchGroups;
        }
        
        #endregion

        #region Controller Actions

        [HttpGet]
        public ActionResult RenderSearchForm(string query, string docTypeAliases, string fieldPropertyAliases, int pageSize, int pagingGroupSize)
        {
            SearchViewModel model = new SearchViewModel();

            if (!string.IsNullOrEmpty(query))
            {
                model.SearchTerm = query;
                model.DocTypeAliases = docTypeAliases;
                model.FieldPropertyAliases = fieldPropertyAliases;
                model.PageSize = pageSize;
                model.PagingGroupSize = pagingGroupSize;
                model.SearchGroups = GetSearchGroups(model);
                model.SearchResults = _searchHelper.GetSearchResults(model, Request.Form.AllKeys);
            }
            return PartialView(PartialViewPath("_SearchForm"), model);
        }



        //
        [HttpGet]
        public ActionResult RenderBlogForm(string query, string docTypeAliases, string fieldPropertyAliases, int pageSize, int pagingGroupSize)
        {
            SearchViewModel model = new SearchViewModel();
            query = "Article";
            if (!string.IsNullOrEmpty(query))
            {
                model.SearchTerm = query;
                model.DocTypeAliases = docTypeAliases;
                model.FieldPropertyAliases = fieldPropertyAliases;
                model.PageSize = pageSize;
                model.PagingGroupSize = pagingGroupSize;
                model.SearchGroups = GetSearchGroups(model);
                model.SearchResults = _searchHelper.GetSearchResults(model, Request.Form.AllKeys);
            }
            return PartialView(PartialViewBlogPath("_BlogList"), model);
        }
        //





        [HttpPost]
        public ActionResult SubmitSearchForm(SearchViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (!string.IsNullOrEmpty(model.SearchTerm) || !string.IsNullOrEmpty(model.Category))
                {
                    model.SearchTerm = model.SearchTerm;
                    model.SearchGroups = GetSearchGroups(model);
                    model.SearchResults = _searchHelper.GetSearchResults(model, Request.Form.AllKeys);
                }
                return RenderSearchResults(model.SearchResults);
            }
            return null;
        }

        public ActionResult RenderSearchResults(SearchResultsModel model)
        {
            return PartialView(PartialViewPath("_SearchResults"), model);
        }



        //
        [HttpPost]
        public ActionResult SubmitBlogForm(SearchViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (!string.IsNullOrEmpty(model.SearchTerm) || !string.IsNullOrEmpty(model.Category))
                {
                    model.SearchTerm = model.SearchTerm;
                    model.SearchGroups = GetSearchGroups(model);
                    model.SearchResults = _searchHelper.GetSearchResults(model, Request.Form.AllKeys);
                }
                return RenderBlogResults(model.SearchResults);
            }
            return null;
        }

        public ActionResult RenderBlogResults(SearchResultsModel model)
        {
            return PartialView(PartialViewBlogPath("_BlogResults"), model);
        }
        //




        #endregion

    }
}