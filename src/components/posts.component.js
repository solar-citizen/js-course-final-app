import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { TransformService } from '../services/transform.service';
import { renderPost } from '../templates/post.template';

export class PostsComponent extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
  }

  async onShow() {
    this.loader.show();
    const fbData = await apiService.fetchPosts();
    const posts = TransformService.fbObjectToArray(fbData);
    const html = posts.map((post) => renderPost(post, { withButton: true }));
    this.loader.hide();
    this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
  }

  onHide() {
    this.$el.innerHTML = '';
  }

  init() {
    this.$el.addEventListener('click', buttonClickHandler.bind(this));
  }
}

function buttonClickHandler(e) {
  const $el = e.target;
  const id = $el.dataset.id;
  const title = $el.dataset.title;

  if (id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const candidate = favorites.find((p) => p.id === id);

    if (candidate) {
      $el.textContent = 'Сохранить';
      $el.classList.add('button-primary');
      $el.classList.remove('button-danger');
      favorites = favorites.filter((post) => post.id !== id);
    } else {
      $el.textContent = 'Удалить';
      $el.classList.remove('button-primary');
      $el.classList.add('button-danger');
      favorites.push({ id, title });
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
