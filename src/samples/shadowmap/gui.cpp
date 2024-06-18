#include "shadowmap_render.h"

#include "../../render/render_gui.h"

void SimpleShadowmapRender::SetupGUIElements()
{
  ImGui_ImplVulkan_NewFrame();
  ImGui_ImplGlfw_NewFrame();
  ImGui::NewFrame();
  {
//    ImGui::ShowDemoWindow();
    ImGui::Begin("Simple render settings");

    ImGui::ColorEdit3("Meshes base color", m_uniforms.baseColor.M, ImGuiColorEditFlags_PickerHueWheel | ImGuiColorEditFlags_NoInputs);

    ImGui::TextColored(ImVec4(1, 1, 0, 1), "Spotlight");
    ImGui::SliderFloat3("Position", spotlightPos.M, -10.f, 10.f);
    ImGui::SliderFloat3("Look at", spotlightLookAt.M, -4.f, 4.f);
    ImGui::SliderFloat("Inner angle", &spotlightInnerAngle, 5.f, spotlightOuterAngle);
    ImGui::SliderFloat("Outer angle", &spotlightOuterAngle, spotlightInnerAngle, 50.f);

    ImGui::Text("Application average %.3f ms/frame (%.1f FPS)", 1000.0f / ImGui::GetIO().Framerate, ImGui::GetIO().Framerate);

    ImGui::NewLine();

    ImGui::TextColored(ImVec4(1.0f, 1.0f, 0.0f, 1.0f),"Press 'B' to recompile and reload shaders");
    ImGui::End();
  }

  // Rendering
  ImGui::Render();
}
