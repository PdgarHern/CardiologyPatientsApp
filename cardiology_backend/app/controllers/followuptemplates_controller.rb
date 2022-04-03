class FollowuptemplatesController < ApplicationController
  before_action :set_followuptemplate, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  # GET /followuptemplates
  def index
    @q = Followuptemplate.ransack(name_cont: params[:search], hospital_id_eq: params[:hosp])

    @followuptemplates = @q.result(distinct: true).all.page params[:page]

    @followuptemplatesSerialized = ActiveModel::SerializableResource.new(@followuptemplates).serializable_hash

    render json: {page: Integer(params[:page]), results: @followuptemplatesSerialized, total_pages: @followuptemplates.total_pages}
  end

  # GET /followuptemplate-last
  def last
    @followuptemplate_last = Followuptemplate.last

    render json: @followuptemplate_last
  end

  # GET /followuptemplates/1
  def show
    render json: @followuptemplate
  end

  # POST /followuptemplates
  def create
    @followuptemplate = Followuptemplate.new(followuptemplate_params)

    if @followuptemplate.save
      render json: @followuptemplate, status: :created, location: @followuptemplate
    else
      render json: @followuptemplate.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /followuptemplates/1
  def update
    if @followuptemplate.update(followuptemplate_params)
      render json: @followuptemplate
    else
      render json: @followuptemplate.errors, status: :unprocessable_entity
    end
  end

  # DELETE /followuptemplates/1
  def destroy
    @followuptemplate.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_followuptemplate
      @followuptemplate = Followuptemplate.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def followuptemplate_params
      params.require(:followuptemplate).permit(:name, :hospital_id)
    end
end
