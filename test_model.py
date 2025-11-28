#!/usr/bin/env python3
"""
Model Diagnostic Script
Test your deepfake detection model with different settings
"""

import os
import sys
import torch
import numpy as np
from pathlib import Path

# Add the current directory to Python path
sys.path.append('.')

try:
    from backend import ModelManager, ResNet50BiLSTM
    print("✅ Successfully imported backend modules")
except ImportError as e:
    print(f"❌ Failed to import backend modules: {e}")
    sys.exit(1)

def test_model_loading(model_path):
    """Test if model loads correctly"""
    print(f"\n🔍 Testing model: {model_path}")
    
    if not Path(model_path).exists():
        print(f"❌ Model file not found: {model_path}")
        return False
    
    try:
        # Test model loading
        model_manager = ModelManager(model_path, device='cpu', threshold=0.5)
        
        # Check if model loaded successfully
        if model_manager.model is None:
            print("❌ Model failed to load")
            return False
        
        print("✅ Model loaded successfully")
        
        # Test with dummy data
        dummy_frames = torch.randn(1, 12, 3, 224, 224)
        with torch.no_grad():
            output = model_manager.model(dummy_frames)
            confidence = torch.sigmoid(output).item()
            
        print(f"✅ Model inference test passed")
        print(f"   Raw output: {output.item():.4f}")
        print(f"   Confidence: {confidence:.4f}")
        print(f"   Prediction: {'FAKE' if confidence > 0.5 else 'REAL'}")
        
        return True
        
    except Exception as e:
        print(f"❌ Model test failed: {e}")
        return False

def test_different_thresholds(model_path):
    """Test model with different threshold values"""
    print(f"\n🎯 Testing different thresholds for: {model_path}")
    
    try:
        # Test with different thresholds
        thresholds = [0.3, 0.4, 0.5, 0.6, 0.7]
        
        for threshold in thresholds:
            model_manager = ModelManager(model_path, device='cpu', threshold=threshold)
            dummy_frames = torch.randn(1, 12, 3, 224, 224)
            
            with torch.no_grad():
                output = model_manager.model(dummy_frames)
                confidence = torch.sigmoid(output).item()
                prediction = "FAKE" if confidence > threshold else "REAL"
                
            print(f"   Threshold {threshold}: confidence={confidence:.4f} → {prediction}")
            
    except Exception as e:
        print(f"❌ Threshold test failed: {e}")

def main():
    print("🚀 Deepfake Detection Model Diagnostic")
    print("=" * 50)
    
    # List available models
    model_files = [
        "model_epoch_30.pth",
        "model_epoch_47.pth", 
        "model_epoch_49.pth",
        "Backend/model_epoch_47.pth"
    ]
    
    print("\n📋 Available model files:")
    for model_file in model_files:
        exists = "✅" if Path(model_file).exists() else "❌"
        print(f"   {exists} {model_file}")
    
    # Test each model
    successful_models = []
    for model_file in model_files:
        if Path(model_file).exists():
            if test_model_loading(model_file):
                successful_models.append(model_file)
                test_different_thresholds(model_file)
    
    # Recommendations
    print("\n💡 Recommendations:")
    if successful_models:
        print(f"   ✅ Working models: {', '.join(successful_models)}")
        print(f"   🎯 Try using the latest model: {successful_models[-1]}")
        print(f"   🔧 Consider lowering the threshold to 0.3-0.4 for better real video detection")
    else:
        print("   ❌ No working models found!")
        print("   🔧 Check if model files are corrupted or incompatible")
    
    print("\n📊 Backend Configuration:")
    print(f"   Current MODEL_PATH: {os.getenv('MODEL_PATH', 'model_epoch_30.pth')}")
    print(f"   Current THRESHOLD: {os.getenv('PREDICTION_THRESHOLD', '0.5')}")
    
    print("\n🔧 To fix the issue:")
    print("   1. Set MODEL_PATH to a working model file")
    print("   2. Lower PREDICTION_THRESHOLD to 0.3 or 0.4")
    print("   3. Example: MODEL_PATH=model_epoch_49.pth PREDICTION_THRESHOLD=0.3 python backend.py")

if __name__ == "__main__":
    main()
