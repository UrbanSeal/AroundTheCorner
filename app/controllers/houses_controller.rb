class HousesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :index ]
  require 'open-uri'
  require 'nokogiri'

  def index

    #Hash par catégorie avec les params du form
    square_meters_form = params[:house]['square_meter'].to_i
    rooms_number_form = params[:house]['number_of_room'].to_i
    minimal_price_form = params[:house]['min_price'].to_i
    maximal_price_form = params[:house]['max_price'].to_i


    @houses = House.all

    # récupérer les bons paramètres pour district et price
    # district = district.name
    # price = house.price
    # ("https://lalilloise-immobilier.fr/annonces/?type=&localite=#{district}&prix=#{price}")

    @results = []

    html_content = URI.open("https://lalilloise-immobilier.fr/annonces/")
    html_doc = Nokogiri::HTML(html_content)
    html_doc.search('.card').each do |element|

    square_meter = element.search(".annonce-infos li").first.text
    room_number = element.search(".annonce-infos li")[1].text
    name = element.search(".card-content .cat-name").text
    description = element.search(".annonce-accroche").text
    price = element.search(".price").text
    link = element.search(".card-link")[0]['href']
    begin
      Nokogiri::HTML(URI.open(link))
    rescue OpenURI::HTTPError => e
      puts "Can't access #{link}"
      puts e.message
      puts
      next
    end

    url_image = element.search(".attachment-annonce-thumb").attr('data-src').value.gsub(/400x200/, '640x480')

      if (square_meter.to_i >= square_meters_form) && (room_number.to_i >= rooms_number_form) && ( minimal_price_form < price.to_i) && ( price.to_i <= maximal_price_form )

        @results << [name: name, description: description, url_image: url_image, square_meter: square_meter, room_number: room_number, price: price, link: link]
    end

    end
  end
end



# methode pour avoir seulement les annonces avec ou + le nombres de pièces demandés
# @room_numbers.each do |room|

# end

# methode pour avoir seulement les annonces avec ou + le nombres de m² demandés
# @square_meters.each do |meter|
#   if
#     p meter
#   end
# end

# if room.to_i >= 3 && meter.to_i >= 70
