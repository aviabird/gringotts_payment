defmodule GringottsPaymentWeb.CamsView do
  use GringottsPaymentWeb, :view

  def render("purchase.json", %{message: result, success: success}) do
    %{
      message: result,
      success: success
    }
  
  end
end