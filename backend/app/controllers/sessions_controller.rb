class SessionsController < ApplicationController
  def login?
    if current_user
      render json: { login: true, user: current_user }
    else
      render json: { login: false, message: 'ユーザーが存在しません' }
    end
  end
end
