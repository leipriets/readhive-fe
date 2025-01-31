import { Route } from "@angular/router";
import { ArticleComponent } from "./components/article.component";
import { CreateArticleComponent } from "./components/createArticle/createArticle.component";
import { ArticleSlugComponent } from "./components/articleSlug/articleSlug.component";

export const routes: Route[] = [
    {
        path: '',
        component: ArticleComponent,
    },
    {
        path: 'articles/new',
        component: CreateArticleComponent,
    },
    {
        path: 'articles/:slug',
        component: ArticleSlugComponent,
    }

];

