class FavoritesController < ApplicationController
  
  def index
     @favorites = Favorite.all.map do |f|
      Openfoodfacts::Product.get(f.product_code, locale: 'fr')
     end
  end
  
  def create
    if Favorite.create(product_code: params[:code], user: current_user)
      redirect_to product_detail_path(params[:code]), notice: 'Product has been favorited'
    else
      redirect_to product_detail_path(params[:code]), alert: 'Something went wrong...'
    end
  end
  
  def destroy
    Favorite.where(favorite_id: @favorite.id, user_id: current_user.id).first.destroy
    redirect_to product_detail_path(params[:code]), notice: 'Product is no longer in favorites'
  end
  
end