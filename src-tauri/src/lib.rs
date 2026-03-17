// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::sync::Mutex;

use tauri::Manager;
use tauri_plugin_shell::ShellExt;
use tauri_plugin_shell::process::CommandChild;

struct ApiProcess(Mutex<Option<CommandChild>>);

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .manage(ApiProcess(Mutex::new(None)))
        .setup(|app| {
            if !cfg!(debug_assertions) {
                let sidecar_command = app.shell().sidecar("api")?;
                let (mut rx, child) = sidecar_command.spawn()?;

                let state = app.state::<ApiProcess>();
                *state.0.lock().unwrap() = Some(child);

                tauri::async_runtime::spawn(async move {
                    while rx.recv().await.is_some() {}
                });
            }

            Ok(())
        })
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::CloseRequested { .. } = event {
                let child = {
                    let state = window.app_handle().state::<ApiProcess>();
                    let child = state.0.lock().unwrap().take();
                    child
                };

                if let Some(child) = child {
                    let _ = child.kill();
                }
            }
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
