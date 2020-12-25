if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_myapp', domain: 'フロントエンドのドメイン'
else
  Rails.application.config.session_store :cookie_store, key: '_myapp'
end
